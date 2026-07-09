import { type SubsonicAuthState, type SubsonicConfig } from "@/shared/context/auth";
import SubsonicAPI, { type SubsonicBaseResponse, type SubsonicError } from "subsonic-api";
import { vi } from "vitest";

/**
 * A minimal fake of the `subsonic-api` client that returns simple
 * default values. These can be overridden with vi.spyOn.
 */
export function makeFakeSubsonicApi(): SubsonicAPI {
  const api: Partial<SubsonicAPI> = {
    baseURL: () => "https://music.example.com/",
    getAlbumInfo: async () => {
      return okResponse({
        albumInfo: {},
      });
    },
    getAlbum: async () => {
      return okResponse({
        album: {
          created: new Date().toISOString(),
          duration: 42 * 60,
          id: "abc",
          name: "mandarin orange",
          songCount: 8,
          artist: "tree",
          artistId: "123",
        },
      });
    },
    getAlbumList2: vi.fn<SubsonicAPI["getAlbumList2"]>(),
    ping: vi.fn<SubsonicAPI["ping"]>(),
  };
  return api as SubsonicAPI;
}

export const baseOkResponse = () =>
  ({
    status: "ok",
    serverVersion: "1.2.3",
    type: "navidrome",
    version: "4.5.6",
    openSubsonic: true,
  }) satisfies SubsonicBaseResponse;

export function okResponse<T>(data: T): SubsonicBaseResponse & T {
  return { ...baseOkResponse(), ...data };
}

export const baseFailedResponse = (
  error: SubsonicError = { code: 0, message: "Unknown error" },
) =>
  ({
    status: "failed",
    error,
    serverVersion: "1.2.3",
    type: "navidrome",
    version: "4.5.6",
    openSubsonic: true,
  }) satisfies SubsonicBaseResponse;

export function failedResponse<T>(
  data: T,
  error?: SubsonicError,
): SubsonicBaseResponse & T {
  return { ...baseFailedResponse(error), ...data };
}

const defaultConfig: SubsonicConfig = {
  url: "https://music.example.com",
  username: "demo",
  password: "demo",
  dangerouslySavePassword: false,
};

/**
 * Builds a {@link SubsonicAuthState} for tests. `requestParams` mirrors the
 * shape captured at login (auth token/salt, client, version) so cover-art URLs
 * come out with realistic query strings.
 */
export function makeSubsonicAuthState(
  overrides: Partial<SubsonicAuthState> = {},
): SubsonicAuthState {
  return {
    config: defaultConfig,
    api: makeFakeSubsonicApi(),
    requestParams: { u: "demo", t: "token", s: "salt", c: "skeuomusic", v: "1.16.1" },
    ...overrides,
  };
}
