const fs = require('fs');
const path = require('path');

// 1. Read filename from argument
let inputFilePath = process.argv[2] || '/home/sdv/Downloads/CC_flows-1.json'; 

if (!inputFilePath || !fs.existsSync(inputFilePath)) {
    console.error("Please provide a valid file path.");
    process.exit(1);
}

// Helper to make string Table safe
function makeCellSafe(str, isHtml = false) {
    if (!str) return "N/A";
    let cleaned = str.replace(/\r?\n|\r/g, " ").trim();
    
    if (isHtml) {
        // Escape HTML special characters
        return cleaned
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    } else {
        // Escape Markdown pipe
        return cleaned.replace(/\|/g, "\\|");
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
                const isSql = target.type === 'postgresdb' || target.type === 'postgres' || target.type.includes('sql');

                if (isHttp || isSql) {
                    const prevs = getPrevNodes(targetId);
                    const prev = prevs[0]; 
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

// 2. Process data
const data = parseFlowFile(inputFilePath);

// 3. Construct Markdown and HTML content
const fileNameOnly = path.basename(inputFilePath);
let mdOutput = `# Flow Analysis: ${fileNameOnly}\n\n`;
mdOutput += "| # | Tab | API | Num | Type | External | Data |\n";
mdOutput += "| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n";


// width: 100%;
let htmlOutput = `
<html>
<head>
    <title>Flow Analysis: ${fileNameOnly}</title>
    <style>
        table { border-collapse: collapse;  font-family: sans-serif; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        tr:nth-child(even) { background-color: #f9f9f9; }
    </style>
</head>
<body>
    <h1>Flow Analysis: ${fileNameOnly}</h1>
    <table>
        <thead>
            <tr>
                <th>#</th><th>Tab</th><th>API</th><th>Num</th><th>Type</th><th>External</th><th>Data</th>
            </tr>
        </thead>
        <tbody>`;

const pathCounter = {};
let rowCount = 0
data.forEach(r => {
    const currentPath = r.entryPath || "unknown";
    pathCounter[currentPath] = (pathCounter[currentPath] || 0) + 1;
    const num = pathCounter[currentPath];

    rowCount++

    // Markdown Row
    mdOutput += `| ${rowCount} | ${makeCellSafe(r.tab)} | ${makeCellSafe(r.entryPath)} | ${num} | ${makeCellSafe(r.type)} | ${makeCellSafe(r.targetName)} | ${makeCellSafe(r.requestData)} |\n`;

    // HTML Row
    htmlOutput += `
            <tr>
                <td>${rowCount}</td>
                <td>${makeCellSafe(r.tab, true)}</td>
                <td>${makeCellSafe(r.entryPath, true)}</td>
                <td>${num}</td>
                <td>${makeCellSafe(r.type, true)}</td>
                <td>${makeCellSafe(r.targetName, true)}</td>
                <td>${makeCellSafe(r.requestData, true)}</td>
            </tr>`;
});

htmlOutput += `
        </tbody>
    </table>
</body>
</html>`;

// 4. Save files
const parsedPath = path.parse(inputFilePath);
const mdFile = path.join(parsedPath.dir, parsedPath.name + ".md");
const htmlFile = path.join(parsedPath.dir, parsedPath.name + ".html");

fs.writeFileSync(mdFile, mdOutput, 'utf8');
fs.writeFileSync(htmlFile, htmlOutput, 'utf8');

console.log(`Success! \nMarkdown: ${mdFile}\nHTML: ${htmlFile}`);