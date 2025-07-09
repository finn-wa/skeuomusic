import { readFileSync } from "node:fs";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import { defineConfig, type ServerOptions } from "vite";
import solidPlugin from "vite-plugin-solid";
import tsConfigPaths from "vite-tsconfig-paths";

import "dotenv/config";

const vars = {
  host: "HOST",
  httpsEnabled: "HTTPS_ENABLED",
  httpsKeyPath: "HTTPS_KEY_PATH",
  httpsCertPath: "HTTPS_CERT_PATH",
  spotifyClientId: "PUBLIC_SPOTIFY_CLIENT_ID",
  spotifyClientSecret: "SPOTIFY_CLIENT_SECRET",
  sessionSecret: "SESSION_SECRET",
} as const;
type EnvVar = (typeof vars)[keyof typeof vars];

warnIfEnvVarsMissing(
  [vars.spotifyClientId, vars.spotifyClientSecret],
  "Spotify integration will not work."
);
requiredEnvVar(
  vars.sessionSecret,
  "This is required for session cookies. Generate a secret with this command: openssl rand -base64 32"
);

let https: ServerOptions["https"] = undefined;
if (booleanEnvVar(vars.httpsEnabled)) {
  const keyPath = requiredEnvVar(vars.httpsKeyPath);
  const certPath = requiredEnvVar(vars.httpsCertPath);
  https = {
    key: readFileSync(keyPath, { encoding: "utf8" }),
    cert: readFileSync(certPath, { encoding: "utf8" }),
  };
}

export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 3000,
    https,
    proxy: {},
  },
  envPrefix: "PUBLIC_",
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart(),
    solidPlugin(),
  ],
});

function warnIfEnvVarsMissing(varNames: EnvVar[], message: string) {
  const missing = varNames.filter((name) => !process.env[name]);
  if (missing.length === 0) {
    return;
  }
  console.warn(`Missing env vars: ${missing.join(", ")}. ${message}`);
}

function requiredEnvVar(name: EnvVar, tip?: string) {
  const value = process.env[name];
  if (!value) {
    let message = `Missing required env var: ${name}`;
    if (tip) {
      message += `. ${tip}`;
    }
    throw new Error(message);
  }
  return value;
}

function booleanEnvVar(name: EnvVar) {
  const value = process.env[name]?.trim().toLowerCase();
  return value != null && value !== "false" && value !== "0" && Boolean(value);
}
