import { build } from "./build";

console.log("Building resume...");

build().then(() => {
  console.log("Resume built successfully!");
}).catch((e: unknown) => {
  console.error("Error building resume: ", e);
  process.exit(1);
});

