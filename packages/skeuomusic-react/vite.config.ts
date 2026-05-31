import tanstackRouter from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackRouter({
      target: "react",
      routesDirectory: "src/routes",
      autoCodeSplitting: true,
      quoteStyle: "double",
    }),
    viteReact(),
  ],
});

export default config;
