const fs = require('fs');
const path = require('path');

// 1. Read filename from argument or default
var flowName = '/home/sdv/Downloads/flows_nr-digitals-scapi.mb-stage.ukrgasbank.com.json'
flowName = '/home/sdv/Downloads/nr-identification.mb-stage.ukrgasbank.com-flows.json'
let inputFilePath = process.argv[2] || flowName; 

if (!inputFilePath || !fs.existsSync(inputFilePath)) {
    console.error("Please provide a valid file path.");
    process.exit(1);
}

function makeCellSafe(str, isHtml = false) {
    if (!str) return "N/A";
    let cleaned = str.toString();
    if (isHtml) {
        return cleaned
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/\r?\n|\r/g, "<br/>");
    } else {
        return cleaned
            .replace(/\r?\n|\r/g, " ")
            .trim()
            .replace(/\|/g, "\\|");
    }
}

function parseFlowFile(filePath) {
    const rawData = fs.readFileSync(filePath);
    const flow = JSON.parse(rawData);

    const nodesById = flow.reduce((acc, node) => { acc[node.id] = node; return acc; }, {});
    const tabs = flow.filter(n => n.type === 'tab').reduce((acc, t) => { acc[t.id] = t.label; return acc; }, {});
    const getPrevNodes = (targetId) => flow.filter(n => n.wires && n.wires.some(w => w.includes(targetId)));

    const results = [];
    const entryPoints = flow.filter(n => n.type === 'http in');

    function trace(entry, current, visited = new Set()) {
        if (!current.wires) return;
        current.wires.forEach(port => {
            port.forEach(targetId => {
                const target = nodesById[targetId];
                if (!target || visited.has(targetId)) return;
                visited.add(targetId);

                const isHttp = target.type === 'http request';
                const isSql = target.type === 'postgresdb' || target.type === 'postgres';

                if (isHttp || isSql) {
                    const prev = getPrevNodes(targetId)[0]; 
                    let dataValue = "N/A";

                    if (isHttp) {
                        const match = prev?.func?.match(/payload\s*=\s*(\{[\s\S]*?\}|[\w.]+)/);
                        dataValue = match ? match[1] : "Dynamic Payload";
                    } else if (isSql) {
                        dataValue = prev?.type === 'template' ? prev.template : "Direct DB Call";
                    }

                    results.push({
                        tab: tabs[entry.z] || "Unknown",
                        entryPath: entry.url,
                        type: isHttp ? "http" : "sql",
                        targetName: `${target.name || target.url || 'Unnamed'} (${target.id})`,
                        requestData: `${dataValue} (from: ${prev?.id || 'direct'})`
                    });
                }
                trace(entry, target, visited);
            });
        });
    }

    entryPoints.forEach(ep => trace(ep, ep));
    return results;
}

const data = parseFlowFile(inputFilePath);
const fileNameOnly = path.basename(inputFilePath);

// Nagłówki zgodne z Twoim wzorem
let mdOutput = `# Flow Analysis: ${fileNameOnly}\n\n`;
mdOutput += "| # | Tab | ## | API | Num | Type | External | Data |\n";
mdOutput += "| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n";

let htmlOutput = `
<html>
<head>
    <title>Flow Analysis: ${fileNameOnly}</title>
    <style>
        body { font-family: sans-serif; padding: 20px; background-color: #f4f4f9; }
        .table-container { width: 100%; overflow-x: auto; border: 1px solid #ddd; border-radius: 8px; background: white; }
        table { border-collapse: collapse; min-width: 100%; white-space: nowrap; }
        th, td { border: 1px solid #70fef7; padding: 12px; text-align: left; }
        th { background-color: #063c2e; color: white; position: sticky; top: 0; }
        .color-a { background-color: #ffffff; }
        .color-b { background-color: #c1fdeb; }
        tr:hover { background-color: #fff9c4 !important; }
        code { font-family: monospace; background: #eee; padding: 2px 4px; }
    </style>
</head>
<body>
    <h1>Flow Analysis: ${fileNameOnly}</h1>
    <div class="table-container">
        <table>
            <thead>
                <tr><th>#</th><th>Tab</th><th>##</th><th>API</th><th>Num</th><th>Type</th><th>External</th><th>Data</th></tr>
            </thead>
            <tbody>`;

const pathCounter = {};      // Licznik Num wewnątrz danego API
const apiUniqueMap = {};     // Mapa do przechowywania unikalnego numeru (##) dla adresu API
let apiUniqueCounter = 0;    // Globalny licznik unikalnych adresów API
let totalCounter = 0;        // Licznik wszystkich wierszy (#)
let lastPath = "";
let useColorA = true;

data.forEach(r => {
    totalCounter++; 
    const currentPath = r.entryPath || "unknown";
    
    // Zmiana koloru wierszy przy zmianie API
    if (currentPath !== lastPath) {
        useColorA = !useColorA;
        lastPath = currentPath;
    }

    // Obsługa kolumny ## (Unikalny numer adresu API)
    if (apiUniqueMap[currentPath] === undefined) {
        apiUniqueCounter++;
        apiUniqueMap[currentPath] = apiUniqueCounter;
    }
    
    // Obsługa kolumny Num (Kolejne wystąpienie wewnątrz tego samego API)
    pathCounter[currentPath] = (pathCounter[currentPath] || 0) + 1;
    
    const apiUID = apiUniqueMap[currentPath]; // Kolumna ##
    const apiNum = pathCounter[currentPath];   // Kolumna Num
    const rowClass = useColorA ? 'color-a' : 'color-b';

    // Append Markdown Row
    mdOutput += `| ${totalCounter} | ${makeCellSafe(r.tab)} | ${apiUID} | ${makeCellSafe(r.entryPath)} | ${apiNum} | ${makeCellSafe(r.type)} | ${makeCellSafe(r.targetName)} | ${makeCellSafe(r.requestData)} |\n`;

    // Append HTML Row
    htmlOutput += `
            <tr class="${rowClass}">
                <td>${totalCounter}</td>
                <td>${makeCellSafe(r.tab, true)}</td>
                <td><strong>${apiUID}</strong></td>
                <td><strong>${makeCellSafe(r.entryPath, true)}</strong></td>
                <td>${apiNum}</td>
                <td><code>${makeCellSafe(r.type, true)}</code></td>
                <td>${makeCellSafe(r.targetName, true)}</td>
                <td><code>${makeCellSafe(r.requestData, true)}</code></td>
            </tr>`;
});

htmlOutput += `</tbody></table></div></body></html>`;

const parsedPath = path.parse(inputFilePath);
const mdFile = path.join(parsedPath.dir, parsedPath.name + ".md");
const htmlFile = path.join(parsedPath.dir, parsedPath.name + ".html");

fs.writeFileSync(mdFile, mdOutput, 'utf8');
fs.writeFileSync(htmlFile, htmlOutput, 'utf8');

console.log(`Success! \nMarkdown: ${mdFile}\nHTML: ${htmlFile}`);