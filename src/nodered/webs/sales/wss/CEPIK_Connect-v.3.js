/**
 * Node.js script to connect to a secure SOAP service (PKCS#12/PFX client certificate).
 * * NOTE: This requires the 'node-forge' package to be installed:
 * npm install node-forge
 */
const fs = require('fs');
const https = require('https');
// You must run 'npm install node-forge' for this line to work.
const forge = require('node-forge'); 
const url = require('url');

// --- CONFIGURATION ---
// The path to your PFX/PKCS#12 certificate file
const PFX_FILE_PATH = './src/nodered/webs/sales/wss/ct.pfx';
// The password for your PFX file
const PFX_PASSWORD = '12345678'; 
// The URL of the target SOAP Service (the endpoint, not the WSDL)
const SOAP_ENDPOINT_URL = 'https://185.41.93.94:6455/cepik/api/ul/UprawnieniaKierowcowPrzewoznicyService';
// A placeholder SOAP action/method name (adjust as needed)
const SOAP_ACTION = 'GetDriverPermissions';

// The SOAP payload body (adjust this XML to match the service's WSDL)
const SOAP_XML = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:ul="http://ul.api.cepik.gov.pl/">
   <soapenv:Header/>
   <soapenv:Body>
      <ul:${SOAP_ACTION}>
         <!-- Sample parameter - replace with actual data -->
         <ul:request>
            <licenseNumber>XYZ123</licenseNumber>
         </ul:request>
      </ul:${SOAP_ACTION}>
   </soapenv:Body>
</soapenv:Envelope>
`;

/**
 * 1. Parses a PFX Buffer using node-forge to extract the PEM-encoded key and certificate.
 * @param {Buffer} pfxBuffer - The buffer of the PFX file content.
 * @param {string} password - The password for the PFX file.
 * @returns {{key: string, cert: string}} - PEM-encoded private key and certificate.
 */
function parsePfx(pfxBuffer, password) {
    console.log('Parsing PFX file...');
    try {
        const p12Asn1 = forge.asn1.fromDer(pfxBuffer.toString('binary'));
        const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, password);

        // Get the key/cert bags
        const keyBags = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag });
        const certBags = p12.getBags({ bagType: forge.pki.oids.certBag });

        if (keyBags[forge.pki.oids.pkcs8ShroudedKeyBag].length === 0 || 
            certBags[forge.pki.oids.certBag].length === 0) {
            throw new Error('PKCS#12 file does not contain a private key and certificate pair.');
        }

        const privateKey = keyBags[forge.pki.oids.pkcs8ShroudedKeyBag][0].key;
        const certificate = certBags[forge.pki.oids.certBag][0].cert;

        return {
            key: forge.pki.privateKeyToPem(privateKey),
            cert: forge.pki.certificateToPem(certificate),
            // Optionally, you could also extract the CA chain if needed:
            // ca: p12.getBags({ bagType: forge.pki.oids.certBag }).map(bag => forge.pki.certificateToPem(bag.cert)).join('\n')
        };
    } catch (e) {
        console.error('Failed to parse PFX file. Check the path, password, and file integrity.');
        throw e;
    }
}

/**
 * 2. Makes the SOAP request using the client certificate credentials.
 * @param {{key: string, cert: string}} credentials - PEM key and certificate.
 */
function makeSoapRequest(credentials) {
    const { key, cert } = credentials;
    const { hostname, port, pathname } = url.parse(SOAP_ENDPOINT_URL);
    
    // Create an HTTPS Agent configured with the client certificate
    const agent = new https.Agent({
        key: key,
        cert: cert,
        // Set the minimum TLS version to ensure compatibility if necessary
        minVersion: 'TLSv1.2', 
        // This is necessary if the server uses a self-signed or non-standard certificate
        // rejectUnauthorized: false 
    });

    const requestOptions = {
        hostname: hostname,
        port: port || 443,
        path: pathname,
        method: 'POST',
        agent: agent,
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'Content-Length': Buffer.byteLength(SOAP_XML),
            'SOAPAction': SOAP_ACTION // Some services require this specific header
        }
    };

    console.log(`Attempting to connect to: ${SOAP_ENDPOINT_URL}`);
    console.log(`Using client certificate for authentication...`);
    
    const req = https.request(requestOptions, (res) => {
        let data = '';

        console.log(`Status Code: ${res.statusCode}`);
        console.log(`Headers: ${JSON.stringify(res.headers)}`);

        // A chunk of data has been received.
        res.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received.
        res.on('end', () => {
            console.log('\n--- SOAP Response Body ---\n');
            console.log(data);
            console.log('\n--------------------------');
        });
    });

    req.on('error', (e) => {
        console.error('\n--- HTTPS Request Error ---\n');
        // Common errors here are 'ECONNREFUSED', 'EHOSTUNREACH', or 'UNABLE_TO_GET_ISSUER_CERT_LOCALLY'
        console.error(`Problem with request: ${e.message}`);
        console.error('This often indicates a network issue, an invalid certificate, or a firewall block.');
        console.error('\n---------------------------');
    });

    // Write data to request body and send
    req.write(SOAP_XML);
    req.end();
}

// --- Main Execution ---

try {
    // 1. Read the PFX file
    const pfxBuffer = fs.readFileSync(PFX_FILE_PATH);

    // 2. Parse the PFX file to get key and cert
    const credentials = parsePfx(pfxBuffer, PFX_PASSWORD);

    // 3. Make the secure SOAP connection
    makeSoapRequest(credentials);

} catch (error) {
    // Catch errors from file reading or parsing
    if (error.code === 'ENOENT') {
        console.error(`\nERROR: PFX file not found at path: ${PFX_FILE_PATH}. Please verify the file path.`);
    } else {
        console.error(`\nFatal error during setup: ${error.message}`);
    }
}
