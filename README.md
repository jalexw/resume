# J. Alex Whitman's Résumé

All about my skills and experience... Built with the open-source typesetting software LaTeX.

Link to the PDF [here](resume.pdf).

## Dependencies
- A [LaTeX](https://www.latex-project.org/get/) installation (I used [MacTeX](https://tug.org/mactex/) on my Mac, installed with Homebrew by `brew install --cask mactex`).
- The [Bun JS Runtime/Package Manager][https://npmjs.com]. Run `bun install` to install the dependencies listed in `package.json`/`bun.lockb` (e.g. chokidar for watching file changes).

## Generate PDF
Run `bun run generate` to generate the PDF once.

Run `bun run watch` to automatically regenerate the resume when the input LaTeX files change.
