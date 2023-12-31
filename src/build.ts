import { Packer as DocxPacker, type Document } from "docx";
import { buildDocument } from "./document";
import { writeFile } from "fs/promises";
import { ResumeBuildConfig } from "./config";

export async function build() {
  let docxDocumentBuffer: Buffer;
  try {
    console.log("Generating docx document...")
    const doc: Document = await buildDocument();
    docxDocumentBuffer = await DocxPacker.toBuffer(doc);
  } catch (e: unknown) {
    console.error("Error generating docx document: ", e);
    process.exit(1);
  }
  
  // Load the configuration from the environment variables
  const config = new ResumeBuildConfig(process.env);

  // Create the output directory if it doesn't exist
  await config.createOutputDirectoryIfNotExists();

  // Used to export the file into a .docx file
  const path = config.getOutputFilePath();
  console.log(`Exporting DOCX document to \"${path}\"...`);
  await writeFile(path, docxDocumentBuffer);
  console.log("DOCX document exported successfully!");
}


