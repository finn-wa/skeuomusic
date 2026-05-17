import type { Cachable } from "../caching/types.js";
import type { AccessToken } from "./AccessToken.js";
import { Crypto } from "./Crypto.js";

export async function refreshCachedAccessToken(
  clientId: string,
  item: AccessToken,
) {
  const updated = await refreshAccessToken(clientId, item.refresh_token);
  return toCachableAccessToken(updated);
}

export function toCachableAccessToken(
  item: AccessToken,
): Cachable & AccessToken {
  if (item.expires && item.expires === -1) {
    return item;
  }

  return { ...item, expires: calculateAccessTokenExpiry(item) };
}

export function calculateAccessTokenExpiry(item: AccessToken) {
  return Date.now() + item.expires_in * 1000;
}

async function refreshAccessToken(
  clientId: string,
  refreshToken: string,
): Promise<AccessToken> {
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const text = await result.text();

  if (!result.ok) {
    throw new Error(`Failed to refresh token: ${result.statusText}, ${text}`);
  }

  const json: AccessToken = JSON.parse(text);
  return json;
}

export function generateCodeVerifier(length: number) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await Crypto.current.subtle.digest("SHA-256", data);

  const digestBytes = [...new Uint8Array(digest)];
  const hasBuffer = typeof Buffer !== "undefined";

  const digestAsBase64 = hasBuffer
    ? Buffer.from(digest).toString("base64")
    : btoa(String.fromCharCode.apply(null, digestBytes));

  return digestAsBase64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
