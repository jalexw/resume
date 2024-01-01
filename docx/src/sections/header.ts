import { type ISectionOptions, Paragraph, TextRun, Table, TableRow, TableCell } from "docx";
import type { ResumeConfig } from "../config";

function Name(config: ResumeConfig) {
  return new Paragraph({
    children: [
      new TextRun({
        text: config.name,
        bold: true,
        size: 48,
        font: 'Inter'
      })
    ],
  })
}

function HeaderTable(config: ResumeConfig) {
  return new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({ // Contact
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "contact@jalexw.ca",
                    bold: true,
                    font: 'Inter'
                  }),
                ],
              })
            ],
            width: {
              size: 30,
              type: "pct"
            }
          }),
          new TableCell({
            children: [
              Name(config)
            ],
            width: {
              size: 40,
              type: "pct"
            }
          }),
          new TableCell({ // Social Media
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Github",
                    bold: true,
                    font: 'Inter'
                  }),
                ],
              })
            ],
            width: {
              size: 30,
              type: "pct"
            }
          })
        ] 
      })
    ],
    width: {
      size: 100,
      type: "pct"
    }
  })
}

export function header(config: ResumeConfig): ISectionOptions {
  return {
    properties: {
      type: "continuous",
    },
    children: [
      HeaderTable(config),
    ]
  }
}
