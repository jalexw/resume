import { Document } from "docx";
import { header } from "./sections/header";
import type { ResumeConfig } from "./config";

import {readFileSync} from 'fs';
import {join} from 'path';


// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
export async function buildDocument(config: ResumeConfig): Promise<Document> {
    // Load font
    const Inter = readFileSync(join(process.cwd(), 'static', 'fonts', 'Inter', 'Inter-VariableFont_slnt,wght.ttf'));
    
    return new Document({
        sections: [
            header(config)
        ],
        creator: config.name,
        title: `${config.name}'s Resume`,
        fonts: [
            {
                name: "Inter",
                data: Inter,
            }
        ],
    });    
}
