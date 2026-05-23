import { PluginOption } from "vite";
import solid from "vite-plugin-solid";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // Vite version mismatch in solidJS plugin
  plugins: [solid() as PluginOption],
  resolve: {
    conditions: ["development", "browser"],
  },
});
