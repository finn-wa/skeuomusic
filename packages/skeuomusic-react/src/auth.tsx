import { useEffect, useState, type PropsWithChildren } from "react";
import SubsonicAPI from "subsonic-api";
import { LoadingPage } from "./components/page-message/page-message";
import {
  AuthContext,
  type SavedSubsonicConfig,
  type SubsonicAuthContext,
  type SubsonicAuthState,
  type SubsonicConfig,
} from "./shared/context/auth";

function getRequestUrl(input: RequestInfo | URL): string {
  if (input instanceof URL) {
    return input.href;
  }
  if (typeof input === "string") {
    return input;
  }
  return input.url;
}

async function loginToSubsonic({
  url,
  username,
  password,
}: SubsonicConfig): Promise<
  | { success: true; api: SubsonicAPI; requestParams: Record<string, string> }
  | { success: false; error: string }
> {
  // Capture the query params (auth token/salt, client, version) from the first
  // request so we can reuse them to build authenticated media URLs later. The
  // token/salt pair stays valid for the session, so we only need to grab it once.
  let requestParams: Record<string, string> | null = null;
  const capturingFetch: typeof fetch = (input, init) => {
    if (requestParams === null) {
      const params = new URL(getRequestUrl(input)).searchParams;
      params.delete("f"); // response format is per-request; not wanted for media URLs
      requestParams = Object.fromEntries(params);
    }
    return fetch(input, init);
  };

  const api = new SubsonicAPI({
    url,
    auth: { username, password },
    fetch: capturingFetch,
  });
  // TODO: figure out error type for failed requests
  const response = await api.ping();
  if (response.status !== "ok") {
    return {
      success: false,
      error: `Subsonic API error ${response.error.code}: ${response.error.message}`,
    };
  }
  if (requestParams === null) {
    return { success: false, error: "Failed to capture request params" };
  }
  return { success: true, api, requestParams };
}

const OPENSUBSONIC_CONFIG_KEY = "opensubsonicConfig";

function isValidSubsonicConfig(config: unknown): config is SavedSubsonicConfig {
  const configObj = config as Record<string, unknown>;
  return (
    config != null &&
    typeof config === "object" &&
    typeof configObj["username"] === "string" &&
    typeof configObj["url"] === "string" &&
    typeof configObj["dangerouslySavePassword"] === "boolean"
  );
}
function hasPassword(config: SavedSubsonicConfig): config is SubsonicConfig {
  return typeof config.password === "string";
}
export function loadSubsonicConfig(): SavedSubsonicConfig | null {
  const configJson = localStorage.getItem(OPENSUBSONIC_CONFIG_KEY);
  if (configJson === null) {
    return null;
  }
  const config = JSON.parse(configJson);
  if (isValidSubsonicConfig(config)) {
    return config;
  }
  console.error("Removing invalid opensubsonic config from local storage: " + config);
  localStorage.removeItem(OPENSUBSONIC_CONFIG_KEY);
  return null;
}

/**
 * Saves config to local storage.
 *
 * @param config The subsonic config
 */
export function saveSubsonicConfig(config: SavedSubsonicConfig) {
  const configToSave = { ...config };
  if (!config.dangerouslySavePassword) {
    delete configToSave.password;
  }
  localStorage.setItem(OPENSUBSONIC_CONFIG_KEY, JSON.stringify(configToSave));
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [subsonicState, setSubsonicState] = useState<SubsonicAuthState | null>(null);
  const [isLoading, setLoading] = useState(true);

  // Restore auth state on app load
  useEffect(() => {
    const subsonicConfig = loadSubsonicConfig();
    if (subsonicConfig === null || !hasPassword(subsonicConfig)) {
      setLoading(false);
      return;
    }
    loginToSubsonic(subsonicConfig)
      .then((response) => {
        if (!response.success) {
          throw new Error(response.error);
        }
        setSubsonicState({
          config: subsonicConfig,
          api: response.api,
          requestParams: response.requestParams,
        });
      })
      .catch((error) => {
        console.error("Login failed", error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  const login: SubsonicAuthContext["login"] = async (config) => {
    const response = await loginToSubsonic(config);
    if (!response.success) {
      throw new Error(response.error);
    }
    saveSubsonicConfig(config);
    setSubsonicState({
      config,
      api: response.api,
      requestParams: response.requestParams,
    });
  };

  const logout: SubsonicAuthContext["logout"] = () => {
    localStorage.removeItem(OPENSUBSONIC_CONFIG_KEY);
  };

  return (
    <AuthContext value={{ subsonic: { login, logout, state: subsonicState } }}>
      {children}
    </AuthContext>
  );
}
