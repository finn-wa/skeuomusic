import { readFileSync } from "node:fs";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tsConfigPaths from "vite-tsconfig-paths";

import "dotenv/config";

function requiredEnvVar(name: string) {
  const value = process.env[name];
  if (typeof value !== "string") {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

const keyPath = requiredEnvVar("HOST_KEY_PATH");
const certPath = requiredEnvVar("HOST_CERT_PATH");
const key = readFileSync(keyPath, { encoding: "utf8" });
const cert = readFileSync(certPath, { encoding: "utf8" });

export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 3000,
    https: { key, cert },
    proxy: {},
  },
  envPrefix: "PUBLIC_",
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart(),
    solidPlugin(),
  ],
});
