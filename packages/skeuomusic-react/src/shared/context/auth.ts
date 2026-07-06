import { createContext } from "react";
import type SubsonicAPI from "subsonic-api";
import { useRequiredContext } from "./utils";

export type AuthContextValue = {
  subsonic: SubsonicAuthContext;
};
export type SubsonicAuthState = {
  config: SubsonicConfig;
  api: SubsonicAPI;
  /**
   * The query parameters (auth token/salt, client, version) captured from the
   * initial ping request. Reused to build authenticated media URLs (e.g. cover
   * art) that can be used directly as an `img` src without fetching a blob.
   * Suitable for passing to the `URLSearchParams` constructor.
   */
  requestParams: Record<string, string>;
};
export type SubsonicConfig = {
  url: string;
  username: string;
  password: string;
  /**
   * Whether to include the password when saving the config to local storage.
   * Local storage is not secure, so it's not recommended.
   */
  dangerouslySavePassword: boolean;
};
export type SavedSubsonicConfig = Omit<SubsonicConfig, "password"> & {
  password?: string;
};
export type SubsonicAuthContext = {
  login: (config: SubsonicConfig) => Promise<void>;
  logout: () => void;
  state: SubsonicAuthState | null;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuthContext() {
  return useRequiredContext(AuthContext);
}

export function useSubsonicAuthState(): SubsonicAuthState {
  const subsonicState = useAuthContext().subsonic.state;
  if (subsonicState == null) {
    throw new Error(
      "useSubsonicAuthState was called but subsonic state is not initialised",
    );
  }
  return subsonicState;
}
