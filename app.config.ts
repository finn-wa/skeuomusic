import { defineConfig } from "@solidjs/start/config";
// Necessary because vinxi doesn't load the env file
// And the HOST variable seems to be the only way to set the host
import "dotenv/config";

export default defineConfig({
  server: {
    https: {
      key: process.env.HOST_KEY_PATH,
      cert: process.env.HOST_CERT_PATH,
    },
  },
  vite: {
    server: {},
    envPrefix: "PUBLIC_",
  },
});
