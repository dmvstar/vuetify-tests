const fs = require('fs');
const path = require('path');

function extractAndSaveFunctions(jsonData, outputDir = 'extracted_functions') {
    let nodes;
    try {
        nodes = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    } catch (error) {
        console.error("Error parsing JSON data:", error);
        return;
    }

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    console.log(`Saving extracted functions to: ${path.resolve(outputDir)}`);

    let extractedCount = 0;
    nodes.forEach(node => {
        if (node.type === "function" && node.func) {
            let functionName = node.name || "untitled_function";
            // Sanitize filename: replace invalid characters with underscores
            functionName = functionName.replace(/[/\\?%*:|"<>]/g, '_');
            const functionCode = node.func;
            
            const filename = `${functionName}.js`;
            const filepath = path.join(outputDir, filename);

            try {
                fs.writeFileSync(filepath, functionCode, 'utf8');
                console.log(`  - Extracted '${node.name || 'N/A'}' to ${filename}`);
                extractedCount++;
            } catch (error) {
                console.error(`  - Error saving function '${node.name || 'N/A'}' to ${filename}:`, error);
            }
        }
    });

    if (extractedCount === 0) {
        console.log("No function nodes of type 'function' found in the provided JSON.");
    } else {
        console.log(`\nSuccessfully extracted ${extractedCount} function(s).`);
    }
}

// Your provided JSON data
const jsonInput = 
[
    {
        "id": "269cf6f79ea8afae",
        "type": "function",
        "z": "ddbf99140b7d5e0b",
        "name": "result isData",
        "func": "context.set(\"counter\", (context.get(\"counter\")||0)+1);\nnode.status({fill:\"red\",shape:\"ring\",text: `${context.get(\"counter\")}`});\n\nvar isString = typeof msg.payload == 'string';\nvar isData = false;\n\nif(Array.isArray(msg.payload) && msg.payload.length > 0){\n    isData = true            \n}\n\nif(isData && !isString) {\n    return [msg, null];\n} else {\n    return [null, msg];\n}\n",
        "outputs": 2,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 240,
        "wires": [
            [
                "983e9c72a2e464df"
            ],
            [
                "d2b60cfdc607f9d9"
            ]
        ]
    }
];

// Run the function with your JSON data

extractAndSaveFunctions(jsonInput);

// To read from a file in Node.js:
// const jsonFromFile = fs.readFileSync('your_nodes.json', 'utf8');
// extractAndSaveFunctions(jsonFromFile, 'functions_from_file');