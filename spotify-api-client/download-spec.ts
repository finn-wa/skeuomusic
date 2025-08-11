import { writeFileSync } from "node:fs";

const specUrl =
  "https://raw.githubusercontent.com/sonallux/spotify-web-api/refs/heads/main/fixed-spotify-open-api.yml";
const openApiYml = await fetch(specUrl).then((res) => res.text());

writeFileSync("./spotify-api-client/spotify-openapi.yml", openApiYml, {
  encoding: "utf8",
});
