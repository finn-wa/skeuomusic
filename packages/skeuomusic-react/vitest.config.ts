import { defineConfig } from "vitest/config";
import viteReact from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  plugins: [viteReact()],
  resolve: { alias: { "@": "/src" } },
  test: {
    setupFiles: ["./src/test/setup.ts"],
    mockReset: true,
    clearMocks: true,
    unstubGlobals: true,
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
      headless: false,
      viewport: { width: 427, height: 640 },
    },
    tags: [
      {
        name: "visual",
        description: "Visual regression tests that use screenshots",
      },
    ],
  },
});
