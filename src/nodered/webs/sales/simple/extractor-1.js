
import { extractImagesFromPdf } from 'pdf-extract-image';
import { writeFileSync, readFileSync } from 'fs';

async function main() {
  //const images = await extractImagesFromPdf('./docs/2025-06-19_099_3069610375_internal-passport.pdf');

  var pdfBuffer = readFileSync('./docs/2025-06-19_099_3069610375_internal-passport.pdf');
  console.log(pdfBuffer);
  const uint8Array = new Uint8Array(pdfBuffer.buffer, pdfBuffer.byteOffset, pdfBuffer.byteLength);
  console.log('Explicit Uint8Array view:', uint8Array);
  const images = await extractImagesFromPdf(uint8Array);
 
  images.forEach((image, index) => {
    writeFileSync(`image${index}.png`, image);
  });


}

main().catch(console.error);

