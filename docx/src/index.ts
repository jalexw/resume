import { build } from "./build";
// export { build };

import {stdout, write} from 'bun'  

const nArgs: number = process.argv.length;

if (nArgs > 3) {
  console.error("Expected exactly 0 or 1 arguments to this program but got ", nArgs - 2);
  process.exit(1);
}

type ProgramActionArgument = 'build';

function getActionArgument(): ProgramActionArgument {
  if (nArgs === 2) {
    return 'build';
  }
  const arg: string = process.argv[2];
  if (arg === 'build') {
    return arg;
  } else {
    console.error("Expected argument to be either 'watch' or 'build' but got ", arg);
    process.exit(1);
  }
}

const actionArgument: ProgramActionArgument = getActionArgument();

switch (actionArgument) {
  case 'build':
    build().then((result) => {
      if (!result.success) {
        console.error("Error building resume: ", result.error);
        process.exit(1);
      }
      const { path } = result;
      write(stdout, path).then((() => {
        process.exit(0);
      })).catch((e: unknown) => {
        console.error("Error writing new docx filepath to stdout: ", e);
        process.exit(1);
      });
    }).catch((e: unknown) => {
      console.error("Error building resume: ", e);
      process.exit(1);
    });
    break;
  default:
    console.error("Unexpected action argument: ", actionArgument);
    process.exit(1);
}

export { build };
