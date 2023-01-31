const chokidar = require('chokidar');

// Files to watch for change
const watchFiles = [
  'resume.tex',
  '_header.tex',
  'TLCresume.sty',
  'sections/**/*.tex',
]

// Watch for changes in the files specified above
const watcher = chokidar.watch(watchFiles)

function buildPDF() {
  // Execute the 'generate' script in package.json
  // This will run the 'pdflatex' command to generate the PDF
  const { exec } = require('child_process');
  exec('npm run generate', (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log("PDF generated!")
  });
}

// Build PDF once at the start
buildPDF();
let lastBuild = Date.now();

watcher.on('all', (event, path) => {
  if (Date.now() - lastBuild < 1000) {
    // Don't build PDF if it was just built less than a second ago
    return;
  } else {
    console.log(event, path);
  }

  buildPDF();
  lastBuild = Date.now();
});