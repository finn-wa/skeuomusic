import { useEffect, useState, type PropsWithChildren } from "react";
import SubsonicAPI from "subsonic-api";
import { LoadingPage } from "./components/page-message/page-message";
import {
  AuthContext,
  type SavedSubsonicConfig,
  type SubsonicAuthState,
  type SubsonicConfig,
} from "./shared/context/auth";

async function loginToSubsonic({
  url,
  username,
  password,
}: SubsonicConfig): Promise<
  { success: true; api: SubsonicAPI } | { success: false; error: string }
> {
  const api = new SubsonicAPI({ url, auth: { username, password } });
  // TODO: figure out error type for failed requests
  const response = await api.ping();
  if (response.status === "ok") {
    return { success: true, api };
  }
  return {
    success: false,
    error: `Subsonic API error ${response.error.code}: ${response.error.message}`,
  };
}

const OPENSUBSONIC_CONFIG_KEY = "opensubsonicConfig";

function isValidSubsonicConfig(config: unknown): config is SavedSubsonicConfig {
  return (
    config != null &&
    typeof config === "object" &&
    typeof (config as Record<string, unknown>)["username"] === "string" &&
    typeof (config as Record<string, unknown>)["url"] === "string"
  );
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
 * @param dangerouslySavePassword Whether to include the password when saving the config.
 *   Local storage is not secure, so it's not recommended.
 */
export function saveSubsonicConfig(
  config: SavedSubsonicConfig,
  dangerouslySavePassword = false,
) {
  const configToSave = { ...config };
  if (!dangerouslySavePassword) {
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
    if (subsonicConfig?.password == null) {
      setLoading(false);
      return;
    }
    loginToSubsonic(subsonicConfig as SubsonicConfig)
      .then((response) => {
        if (!response.success) {
          throw new Error(response.error);
        }
        setSubsonicState({
          username: subsonicConfig.username,
          api: response.api,
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

  const login = async (config: SubsonicConfig, dangerouslySavePassword = false) => {
    const response = await loginToSubsonic(config);
    if (!response.success) {
      throw new Error(response.error);
    }
    saveSubsonicConfig(config, dangerouslySavePassword);
  };

  const logout = () => {
    localStorage.removeItem(OPENSUBSONIC_CONFIG_KEY);
  };

  return (
    <AuthContext value={{ subsonic: { login, logout, state: subsonicState } }}>
      {children}
    </AuthContext>
  );
}
