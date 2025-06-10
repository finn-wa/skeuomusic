// @refresh reload
import { StartServer, createHandler } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="icon"
            type="image/png"
            sizes="64x64"
            href="/favicon-64.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="128x128"
            href="/favicon-128.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="256x256"
            href="/favicon-256.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/favicon-512.png"
          />{" "}
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
