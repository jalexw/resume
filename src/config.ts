import { join } from 'path';
import { exists, mkdir } from "fs/promises";

// List the environment variables that are used in this file
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RESUME_OUTPUT_DIR_NAME: string;
      RESUME_OUTPUT_FILE_PREFIX?: string;
      RESUME_OUTPUT_FILE_TIMESTAMP_TYPE?: "date" | "time" | "ISO" | "ms";
    }
  }
}

export class ResumeBuildConfig {
  private OUTPUT_DIR_PATH: string;
  private OUTPUT_FILE_PREFIX: string;
  private static OUTPUT_FILENAME_SUFFIX: string = "docx";
  private OUTPUT_FILE_TIMESTAMP_FORMATTER: ((date: Date) => string) | null;

  constructor(env: typeof process.env) {
    if (!env.RESUME_OUTPUT_DIR_NAME) {
      console.error("RESUME_OUTPUT_DIR_NAME environment variable not set!");
      process.exit(1);
    }
    this.OUTPUT_DIR_PATH = join(process.cwd(), env.RESUME_OUTPUT_DIR_NAME);

    this.OUTPUT_FILE_PREFIX = env.RESUME_OUTPUT_FILE_PREFIX || "resume";

    switch (env.RESUME_OUTPUT_FILE_TIMESTAMP_TYPE) {
      case "ISO":
        this.OUTPUT_FILE_TIMESTAMP_FORMATTER = (date: Date) => date.toISOString();
        break;
      case "date": 
        this.OUTPUT_FILE_TIMESTAMP_FORMATTER = (date: Date) => this.formatDate(date);
        break;
      case "time":
        this.OUTPUT_FILE_TIMESTAMP_FORMATTER = (date: Date) => this.formatTime(date);
        break;
      case "ms":
        this.OUTPUT_FILE_TIMESTAMP_FORMATTER = (date: Date) => date.getTime().toString();
        break;
      default:
        this.OUTPUT_FILE_TIMESTAMP_FORMATTER = null;
        break;
    }
  }

  private padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  
  private formatDate(date: Date) {
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
  }
  
  private formatTime(date: Date) {
    return (
      this.formatDate(date) +
      '_' +
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
        this.padTo2Digits(date.getSeconds()),
      ].join('\:')
    );
  }

  private getOutputFileName(): string {
    let middle = "";
    if (this.OUTPUT_FILE_TIMESTAMP_FORMATTER) {
      middle = `_${this.OUTPUT_FILE_TIMESTAMP_FORMATTER(new Date())}`;
    }

    return `${this.OUTPUT_FILE_PREFIX}${middle}.${ResumeBuildConfig.OUTPUT_FILENAME_SUFFIX}`;
  }
  
  public getOutputFilePath(): string {
    return join(this.OUTPUT_DIR_PATH, this.getOutputFileName());
  }

  public async createOutputDirectoryIfNotExists() {
    if (!await exists(this.OUTPUT_DIR_PATH)) {
      console.log("Creating output directory...")
      await mkdir(this.OUTPUT_DIR_PATH);
      console.log("Output directory created!")
      return;
    }
  }
}