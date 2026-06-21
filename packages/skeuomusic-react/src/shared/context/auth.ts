import { createContext } from "react";
import type SubsonicAPI from "subsonic-api";
import { useRequiredContext } from "./utils";

export type AuthContextValue = {
  subsonic: SubsonicAuthContext;
};
export type SubsonicAuthState = {
  username: string;
  api: SubsonicAPI;
};
export type SubsonicConfig = {
  url: string;
  username: string;
  password: string;
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
