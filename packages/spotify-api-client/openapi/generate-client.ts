import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs";

const cwd = "./openapi";

async function downloadOpenApiSpec() {
  console.log(
    "(1/3) Downloading latest OpenAPI spec from sonallux/spotify-web-api...",
  );
  mkdirSync(`${cwd}/spec`, { recursive: true });
  const specUrl =
    "https://raw.githubusercontent.com/sonallux/spotify-web-api/refs/heads/main/fixed-spotify-open-api.yml";
  const openApiYml = await fetch(specUrl).then((res) => res.text());
  writeFileSync("./openapi/spec/spotify.yml", openApiYml, {
    encoding: "utf8",
  });
  console.log("(1/3) Done.");
}

function generateClient() {
  console.log("(2/3) Generating OpenAPI TypeScript client...");
  rmSync(`${cwd}/client`, { recursive: true, force: true });
  mkdirSync(`${cwd}/client`);
  const oagResult = spawnSync(
    "node_modules/.bin/openapi-generator-cli",
    ["generate"],
    { stdio: "inherit" },
  );
  if (oagResult.error != null) {
    throw oagResult.error;
  }
  console.log("(2/3) Done.");
}

function saveGeneratedSourceCode() {
  console.log("(3/3) Copying generated code to ./src/openapi...");
  rmSync("./src/openapi", { recursive: true, force: true });
  // First make a copy of generated src called openapi
  cpSync(`${cwd}/client/src`, `${cwd}/client/openapi`, { recursive: true });
  // Then move the copy into ./src
  renameSync(`${cwd}/client/openapi`, "./src/openapi");

  console.log("Formatting generated files...");
  const fmtResult = spawnSync("node_modules/.bin/oxfmt", ["./src/openapi"], {
    stdio: "inherit",
  });
  if (fmtResult.error != null) {
    throw fmtResult.error;
  }
  console.log("(3/3) Done.");
}

await downloadOpenApiSpec();
generateClient();
saveGeneratedSourceCode();
