import { defineProject } from "vitest/config";
import viteReact from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";

const ui = false;
export default defineProject({
  plugins: [viteReact()],
  resolve: { alias: { "@": "/src" } },
  test: {
    setupFiles: ["./src/test/setup.ts"],
    mockReset: true,
    clearMocks: true,
    unstubGlobals: true,
    browser: {
      ui,
      headless: !ui,
      screenshotFailures: false,
      enabled: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
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
