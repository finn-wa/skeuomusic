import solid from "vite-plugin-solid";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // Vite version mismatch in solidJS plugin
  plugins: [solid() as any],
  resolve: {
    conditions: ["development", "browser"],
  },
});
