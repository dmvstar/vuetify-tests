const fs = require('fs');
const forge = require('node-forge');

const pfxFilePath = './src/nodered/webs/sales/wss/ct.pfx'; // Path to your PFX file
const urlServise = 'https://185.41.93.94:6455/cepik/api/ul/UprawnieniaKierowcowPrzewoznicyService'
const pfxPassword = '12345678';      // Password for your PFX file


// 1. Read the PFX/P12 file as a Buffer
const pfx = fs.readFileSync(pfxFilePath); 

// 2. Convert the Buffer to a binary string (forge works with binary strings for PKCS#12)
const p12Asn1 = forge.asn1.fromDer(pfx.toString('binary'));

// 3. Parse the PKCS#12 file
try {
    const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, pfxPassword);
    
    console.log('Successfully parsed PFX/PKCS#12 file.');

    // You can now extract the private key, certificate, and CA chain
    const keyBags = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag });
    const certBags = p12.getBags({ bagType: forge.pki.oids.certBag });

    const privateKey = keyBags[forge.pki.oids.pkcs8ShroudedKeyBag][0].key;
    const certificate = certBags[forge.pki.oids.certBag][0].cert;
    
    // Convert to PEM format if needed for use with built-in Node.js functions
    const pemKey = forge.pki.privateKeyToPem(privateKey);
    const pemCert = forge.pki.certificateToPem(certificate);

    console.log('PEM Key extracted:', pemKey.substring(0, 50) + '...');
    
} catch (error) {
    console.error('Error parsing PFX file. Check the password or file integrity.', error);
}