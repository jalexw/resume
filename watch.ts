import { watch } from "chokidar";
import { exec } from "child_process";

// Files to watch for change
const watchFiles: string[] = [
  'resume.tex',
  '_header.tex',
  'TLCresume.sty',
  'sections/**/*.tex',
];

// Watch for changes in the files specified above
const watcher = watch(watchFiles);

function buildPDF() {
  // Execute the 'generate' script in package.json
  // This will run the 'pdflatex' command to generate the PDF
  exec('npm run generate', (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }

    if (stderr) console.log("STDERR: ", stderr);

    // the *entire* stdout and stderr (buffered)
    console.log("PDF generated!");
  });
}

// Build PDF once at the start
buildPDF();
let lastBuildTime: number = Date.now();

watcher.on('all', (event, path) => {
  if (Date.now() - lastBuildTime < 1000) {
    // Don't build PDF if it was just built less than a second ago
    return;
  } else {
    console.log(`${event} @ ${path}`);
  }

  buildPDF();
  lastBuildTime = Date.now();
});
