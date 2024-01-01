import { Packer as DocxPacker, type Document } from "docx";
import { buildDocument } from "./document";
import { writeFile } from "fs/promises";
import { ResumeConfig } from "./config";

export type ResumeBuildResult = {
  success: true;
  docx: Buffer;
  path: string;
} | {
  success: false;
  error: Error;
}

export async function build(): Promise<ResumeBuildResult> {
  try {
    // Load the configuration from the environment variables
    const config = new ResumeConfig(process.env);

    let docxDocumentBuffer: Buffer;
    try {
      const doc: Document = await buildDocument(config);
      docxDocumentBuffer = await DocxPacker.toBuffer(doc);
    } catch (e: unknown) {
      console.error("Error generating docx document: ", e);
      process.exit(1);
    }

    // Create the output directory if it doesn't exist
    await config.createOutputDirectoryIfNotExists();

    // Used to export the file into a .docx file
    const path = config.getOutputFilePath();
    await writeFile(path, docxDocumentBuffer);
    return {
      success: true,
      docx: docxDocumentBuffer,
      path,
    }
  } catch (e: unknown) {
    console.error("Error building resume: ", e);
    return {
      success: false,
      error: e as Error,
    }
  }
}
