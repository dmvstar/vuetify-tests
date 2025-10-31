const https = require('https');
const fs = require('fs');
const crypto = require('crypto'); // Needed for PFX parsing
//console.log('Crypto module:', crypto); // <-- Add this line

// --- Configuration ---
// Make a example Node.js Connect to urlServise with pfx certyficate
const pfxFilePath = './src/nodered/webs/sales/wss/ct.pfx'; // Path to your PFX file
const urlServise = 'https://185.41.93.94:6455/cepik/api/ul/UprawnieniaKierowcowPrzewoznicyService'
const pfxPassword = '12345678';      // Password for your PFX file

// --- Function to make the HTTPS request ---
async function makeSecureRequest() {
    // --- Read PFX File ---
    let pfxBuffer;
    try {
        pfxBuffer = fs.readFileSync(pfxFilePath);
    } catch (error) {
        console.error(`Error reading PFX file from ${pfxFilePath}:`, error.message);
        return;
    }

    // --- Parse PFX File ---
    let parsedPfx;
    try {
        // Use crypto.pkcs12.parse for modern Node.js versions
        // If this fails, you might need to use crypto.createCredentials (deprecated)
        // but let's try the modern way first.
        if (!crypto.pkcs12 || typeof crypto.pkcs12.parse !== 'function') {
             throw new Error('crypto.pkcs12.parse is not available in this Node.js environment. Consider updating Node.js or using a different parsing method if available.');
        }
        parsedPfx = crypto.pkcs12.parse(pfxBuffer, pfxPassword);
    } catch (error) {
        console.error('Error parsing PFX file:', error.message);
        if (error.message.includes('invalid key')) {
            console.error('Hint: Ensure the PFX password is correct.');
        }
        return;
    }

    // --- Extract Certificate and Private Key ---
    // parsedPfx.key is the private key
    // parsedPfx.cert is an array of certificates in the chain; index 0 is usually your client cert
    const certificate = parsedPfx.cert[0].toString();
    const privateKey = parsedPfx.key.toString();

    // --- Create HTTPS Agent with Client Certificate ---
    // This agent will be used by the https.request to authenticate with the server.
    const httpsAgent = new https.Agent({
        cert: certificate,
        key: privateKey,
        rejectUnauthorized: true // Set to false if your server uses a self-signed cert and you trust it (use with caution!)
        // If the server's certificate is signed by a custom CA, you'll need to provide it:
        // ca: fs.readFileSync('./path/to/your/ca.crt')
    });

    // --- Prepare Request Options ---
    // Parse the URL to get hostname, port, path, and method
    const urlParts = new URL(urlServise);
    const requestOptions = {
        hostname: urlParts.hostname,
        port: urlParts.port,
        path: urlParts.pathname + urlParts.search, // Include query parameters if any
        method: 'GET', // Adjust method as needed (e.g., 'POST', 'PUT')
        agent: httpsAgent, // Attach the agent with the PFX certificate
        // If you need to send a request body (for POST/PUT):
        // headers: {
        //     'Content-Type': 'application/json',
        //     'Content-Length': Buffer.byteLength(requestBody)
        // }
    };

    // --- Make the HTTPS Request ---
    console.log(`Making HTTPS request to: ${urlServise}`);
    const request = https.request(requestOptions, (response) => {
        let responseData = '';

        // Handle response data
        response.on('data', (chunk) => {
            responseData += chunk;
        });

        // Handle end of response
        response.on('end', () => {
            console.log('Response received:');
            console.log('Status Code:', response.statusCode);
            console.log('Headers:', response.headers);
            console.log('Body:', responseData);

            if (response.statusCode >= 200 && response.statusCode < 300) {
                console.log('Request successful!');
                // Process responseData here if needed
            } else {
                console.error('Request failed with status code:', response.statusCode);
            }
        });
    });

    // --- Handle Request Errors ---
    request.on('error', (error) => {
        console.error('Error making HTTPS request:', error.message);
    });

    // --- If sending data (e.g., for POST requests) ---
    // const requestBody = JSON.stringify({ key: 'value' }); // Example data
    // request.write(requestBody);

    // --- End the request ---
    request.end();
}

// --- Execute the function ---
makeSecureRequest();
