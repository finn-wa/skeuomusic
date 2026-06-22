import type { SubsonicConfig } from "@/shared/context/auth";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export const SUBSONIC_FORM_ID = "subsonicConfig";

export type SubsonicFormProps = {
  onSubmit: (state: SubsonicFormValue) => void | Promise<void>;
  setIsValid: (valid: boolean) => void;
  initialState?: Partial<SubsonicFormValue>;
};

export type SubsonicFormValue = SubsonicConfig;

export default function SubsonicForm({ onSubmit, initialState = {} }: SubsonicFormProps) {
  const [url, setUrl] = useState(initialState.url ?? "");
  const [username, setUsername] = useState(initialState.username ?? "");
  const [password, setPassword] = useState("");
  const [isSavePassword, setSavePassword] = useState(
    initialState.dangerouslySavePassword ?? false,
  );

  async function submit() {
    const formState: SubsonicFormValue = {
      url,
      username,
      password,
      dangerouslySavePassword: isSavePassword,
    };
    await onSubmit(formState);
  }
  return (
    <form id={SUBSONIC_FORM_ID} action={submit}>
      <fieldset className="form-group">
        <div className="form-row">
          <label htmlFor="subsonicUrl">Server URL</label>
          <input
            required
            name="url"
            id="subsonicUrl"
            type="text"
            placeholder="https://demo.navidrome.org"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="subsonicUsername">User Name</label>
          <input
            required
            name="username"
            id="subsonicUsername"
            type="text"
            placeholder="demo"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="subsonicPassword">Password</label>
          <input
            required
            name="password"
            id="subsonicPassword"
            type="password"
            placeholder={initialState.dangerouslySavePassword ? "Saved" : "demo"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="subsonicSavePassword">Save password</label>
          <input
            name="savePassword"
            id="subsonicSavePassword"
            type="checkbox"
            checked={isSavePassword}
            onChange={(e) => setSavePassword(e.target.checked)}
          />
        </div>
      </fieldset>
      <Submit />
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}
