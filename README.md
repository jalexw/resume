# J. Alex Whitman's Résumé

All about my skills and experience... Built with the open-source typesetting software LaTeX.

Link to the PDF [here](resume.pdf).

## Dependencies
- A [LaTeX](https://www.latex-project.org/get/) installation (I used [MacTeX](https://tug.org/mactex/) on my Mac, installed with Homebrew by `brew install --cask mactex`).
- [Node Package Manager][https://npmjs.com]. Run `npm install` to install the dependencies listed in `package.json`/`package-lock.json` (e.g. chokidar for watching file changes).

## Generate PDF
Run `npm run generate` to generate the PDF once.

Run `npm run watch` to automatically regenerate the resume when the input LaTeX files change.
