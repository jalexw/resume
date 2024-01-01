import { watch } from "chokidar";
import { exec } from "child_process";
import { join } from 'path';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DEBUG?: 'true' | 'false';
    }
  }

}

export class ResumeHotReloader {
  private watcher;
  private static debounceTimeout: number = 1000;

  private static getWatchFiles(): string[] {
    const curDir = process.cwd();
    const docxDir = join(curDir, '..', 'docx') // project for docx resume generation
    return [
      join(docxDir, 'src'),
      join(docxDir, 'static'),
      join(docxDir, '.env'),
      join(docxDir, 'package.json'),
      join(docxDir, 'tsconfig.json'),
      join(docxDir, 'bun.lockb')
    ];
  }

  private static exec_buildPDF() {
    // Execute the 'generate' script in package.json
    // This will run the 'pdflatex' command to generate the PDF
    exec('cd ../docx && bun run build', (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        return;
      }
  
      if (stdout) {
        const output_filepath: string = stdout.trim();
        console.log("Resume generated at: ", output_filepath);
      } else {
        console.log("No output from build script");
      }
  
      // the *entire* stdout and stderr (buffered)
      console.log("PDF generated!");
    });
  }

  constructor() {
    // Build PDF once at the start
    ResumeHotReloader.exec_buildPDF();
    let lastBuildTime: number = Date.now();

    const watchFiles: string[] = ResumeHotReloader.getWatchFiles();
    if (process.env.NODE_ENV === 'development') {
      console.log("Running in development mode")
      console.log("Files to watch: ", watchFiles)
    }

    this.watcher = watch(watchFiles, {
      depth: 5
    });

    this.watcher.on('ready', () => {
      console.log("Watching files for changes...");
    });

    this.watcher.on('all', (event, path) => {
      if (process.env.NODE_ENV === 'development' || process.env.DEBUG === 'true') {
        if (process.env.DEBUG === 'true') {
          console.log(`${event} @ ${path}`);
        } else if (event === 'change') {
          console.log(`${event} @ ${path}`);
        }
        
      }
      if (Date.now() - lastBuildTime < ResumeHotReloader.debounceTimeout) {
        // Don't build PDF if it was just built less than a second ago
        if (process.env.DEBUG === 'true') {
          console.log("Skipping PDF build due to debounce timeout")
        }
        return;
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.log("Triggering PDF build from file change");
        }
      }

      ResumeHotReloader.exec_buildPDF();
      lastBuildTime = Date.now();
    });
  }
}