/*
make a function for parsing a node-red flow from local file

find all http in wire
find all http requiest in wire
find all sql requiest in wire
for http request get a payload from prev node
for sql request get a SQL from prev template
many row for one in wire
result make as markdown table with columns
Tab node|nttp in path|type of request http or sql|http endpoint name or sql node name with nodeid|Request data payload or SQL with nodeid
Title of table
Tab|API|Num|Type|External|Data

add to function create html with same header 
add to table style change row color for uniq API name 
make table style with horis scroll

read file name from arg 
save result to file with ext md maked from input file name 

*/

const fs = require('fs');
const path = require('path');

// 1. Read filename from argument
let inputFilePath = process.argv[2] || '/home/sdv/Downloads/CC_flows.json'; 

if (!inputFilePath || !fs.existsSync(inputFilePath)) {
    console.error("Please provide a valid file path. Example: node script.js CC_flows.json");
    process.exit(1);
}

// Helper to make string Markdown Table safe
function makeCellSafe(str) {
    if (!str) return "N/A";
    return str
        .replace(/\r?\n|\r/g, " ") // Replace newlines with space
        .replace(/\|/g, "\\|")      // Escape the pipe character
        .trim();
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

                // Note: updated sql type check to 'postgresdb' to match your previous flow file
                const isHttp = target.type === 'http request';
                const isSql = target.type === 'postgresdb' || target.type === 'postgres';

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

// 3. Construct Markdown content with Counter
let output = `# Flow Analysis: ${path.basename(inputFilePath)}\n\n`;
//output += "| Tab node | http in path | count | type of request | http endpoint or sql | request data |\n";
output += "| Tab | API | Num | Type | External | Data |\n";
output += "| :--- | :--- | :--- | :--- | :--- | :--- |\n";

// Object to track occurrences of each path
const pathCounter = {};

data.forEach(r => {
    // Increment counter for this specific path
    const currentPath = r.entryPath || "unknown";
    pathCounter[currentPath] = (pathCounter[currentPath] || 0) + 1;

    // Sanitize cells
    const tab = makeCellSafe(r.tab);
    const urlPath = makeCellSafe(r.entryPath);
    const count = pathCounter[currentPath];
    const type = makeCellSafe(r.type);
    const name = makeCellSafe(r.targetName);
    const req = makeCellSafe(r.requestData);

    output += `| ${tab} | ${urlPath} | ${count} | ${type} | ${name} | ${req} |\n`;
});

// 4. Generate output filename
const parsedPath = path.parse(inputFilePath);
const outputFileName = path.join(parsedPath.dir, parsedPath.name + ".md");

// 5. Save to file
fs.writeFileSync(outputFileName, output, 'utf8');

console.log(`Success! Result saved to: ${outputFileName}`);
console.log(output);
