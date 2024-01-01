# J. Alex Whitman's Résumé

All about my skills and experience...

Built with the open-source typesetting software LaTeX.

Link to the PDF [here](resume.pdf).

## Dependencies
Required packages need to be installed with [Bun JS Runtime/Package Manager][https://bun.sh].

## Installation
```bash
# Download this code from the git repository
git clone https://github.com/jalexw/resume.git

# Use Bun (https://bun.sh) to install the dependencies listed in `package.json`/`bun.lockb`
cd docx && bun install
```

## Generate document


```bash
# Make sure you're in the docx directory
cd docx

# Build the docx file
bun run build
```