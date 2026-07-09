import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  getRequestUrl,
  loginToSubsonic,
  type SubsonicApiFactory,
  type SubsonicLoginError,
  type SubsonicLoginSuccess,
} from "./auth";
import type SubsonicAPI from "subsonic-api";
import type { SubsonicBaseResponse } from "subsonic-api";

describe("getRequestUrl", () => {
  it("returns the href of a URL instance", () => {
    const url = new URL("https://music.example.com/rest/ping.view?a=1");
    expect(getRequestUrl(url)).toBe(url.href);
  });

  it("returns a string input unchanged", () => {
    const input = "https://music.example.com/rest/ping.view?a=1";
    expect(getRequestUrl(input)).toBe(input);
  });

  it("returns the url of a Request", () => {
    const request = new Request("https://music.example.com/rest/ping.view?a=1");
    expect(getRequestUrl(request)).toBe(request.url);
  });
});

describe("loginToSubsonic", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null)));
  });

  const config = {
    url: "https://music.example.com",
    username: "demo",
    password: "secret",
    dangerouslySavePassword: false,
  };
  const baseResponse: SubsonicBaseResponse = {
    status: "ok",
    serverVersion: "1.2.3",
    type: "navidrome",
    version: "4.5.6",
  };

  it("returns success with captured request params (f removed)", async () => {
    const mockApiFactory: SubsonicApiFactory = (config) =>
      ({
        ping: async () => {
          await config.fetch!(
            new URL(
              "https://music.example.com/rest/ping.view?u=demo&t=tok&s=salt&c=skeuomusic&v=1.16.1&f=json",
            ),
          );
          return baseResponse;
        },
      }) as SubsonicAPI;

    const result = await loginToSubsonic(config, mockApiFactory);
    expect(
      result.success,
      "Returned error message: " + (result as SubsonicLoginError).error,
    ).toBe(true);
    const successResult = result as SubsonicLoginSuccess;
    expect(successResult.requestParams).toEqual({
      u: "demo",
      t: "tok",
      s: "salt",
      c: "skeuomusic",
      v: "1.16.1",
    });
    expect(successResult.api).toBeDefined();
  });

  it("returns an error when ping status is not ok", async () => {
    const mockApiFactory: SubsonicApiFactory = (config) =>
      ({
        ping: async () => {
          await config.fetch!(
            new URL(
              "https://music.example.com/rest/ping.view?u=demo&t=tok&s=salt&c=skeuomusic&v=1.16.1&f=json",
            ),
          );
          return {
            ...baseResponse,
            status: "failed",
            error: { code: 40, message: "Wrong username or password" },
          };
        },
      }) as SubsonicAPI;

    const result = await loginToSubsonic(config, mockApiFactory);

    expect(result).toEqual({
      success: false,
      error: "Subsonic API error 40: Wrong username or password",
    });
  });
});
