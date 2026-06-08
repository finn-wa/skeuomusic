import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import type { OpenAPIObject } from "openapi3-ts/oas30";
import YAML from "yaml";
import { processOpenApiSpec } from "./process-spec.ts";

const cwd = "./openapi";
const originalSpecPath = `${cwd}/spec/spotify-original.yml`;
const outputSpecPath = `${cwd}/spec/spotify.yml`;

async function downloadOpenApiSpec() {
  console.log("(1/4) Downloading latest OpenAPI spec from sonallux/spotify-web-api...");
  mkdirSync(`${cwd}/spec`, { recursive: true });
  const specUrl =
    "https://raw.githubusercontent.com/sonallux/spotify-web-api/refs/heads/main/fixed-spotify-open-api.yml";
  const openApiYml = await fetch(specUrl).then((res) => res.text());
  writeFileSync(originalSpecPath, openApiYml, { encoding: "utf8" });
  console.log("(1/4) Done.");

  console.log("2/4 Processing OpenAPI spec...");
  const spec: OpenAPIObject = YAML.parse(openApiYml);
  const commitHash = await getLatestCommitHash();
  const processedSpec = processOpenApiSpec(spec, commitHash);
  writeFileSync(outputSpecPath, YAML.stringify(processedSpec), {
    encoding: "utf8",
  });
  console.log("(2/4) Done.");
}

async function getLatestCommitHash(): Promise<string> {
  return fetch(
    "https://api.github.com/repos/sonallux/spotify-web-api/commits?sha=main&per_page=1",
    {
      headers: {
        Accept: "application/json",
        "X-GitHub-Api-Version": "2026-03-10",
      },
    },
  )
    .then(
      (res) =>
        res.json() as Promise<{ sha: string; commit: { author: { date: string } } }[]>,
    )
    .then((body) => {
      if (body.length === 0) {
        throw new Error("No commits returned from GitHub");
      }
      return body[0]!.sha.slice(0, 7);
    });
}

function generateClient() {
  console.log("(3/4) Generating OpenAPI TypeScript client...");
  rmSync(`${cwd}/client`, { recursive: true, force: true });
  mkdirSync(`${cwd}/client`);
  const oagResult = spawnSync("node_modules/.bin/openapi-generator-cli", ["generate"], {
    stdio: "inherit",
  });
  if (oagResult.error != null) {
    throw oagResult.error;
  }
  console.log("(3/4) Done.");
}

function saveGeneratedSourceCode() {
  console.log("(4/4) Formatting and copying generated code to ./src/openapi...");
  rmSync("./src/openapi", { recursive: true, force: true });
  // First make a copy of generated src called openapi
  cpSync(`${cwd}/client/src`, `${cwd}/client/openapi`, { recursive: true });
  // Then move the copy into ./src
  renameSync(`${cwd}/client/openapi`, "./src/openapi");
  // Format it
  spawnSync("pnpm", ["oxfmt", "./src/openapi"], { stdio: "inherit" });
  console.log("(4/4) Done.");
}

await downloadOpenApiSpec();
generateClient();
saveGeneratedSourceCode();
