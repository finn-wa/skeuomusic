import { RequestHandler } from "@builder.io/qwik-city";
import { AccessToken } from "@spotify/web-api-ts-sdk";

export const onPost: RequestHandler = async ({ request, cookie, json }) => {
  console.log("received postback");
  const body: AccessToken = await request.json();
  if (!body.access_token) {
    json(400, { error: "Missing access token" });
    return;
  }

  cookie.set("spotify_token", body, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "Strict",
    maxAge: body.expires_in,
  });

  json(200, { success: true, hello: "world" });
};
