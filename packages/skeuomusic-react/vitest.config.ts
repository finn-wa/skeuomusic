import { defineConfig } from "vitest/config";
import viteReact from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  plugins: [viteReact()],
  resolve: { alias: { "@": "/src" } },
  test: {
    mockReset: true,
    clearMocks: true,
    unstubGlobals: true,
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
    },
  },
});
