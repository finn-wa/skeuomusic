import { loadSubsonicConfig } from "@/auth";
import SubsonicForm, {
  SUBSONIC_FORM_ID,
  type SubsonicFormValue,
} from "@/components/subsonic-form/subsonic-form";
import { useAuthContext } from "@/shared/context/auth";
import { type HeaderState } from "@/shared/context/header";
import { createFileRoute } from "@tanstack/react-router";

const title = "More";
export const Route = createFileRoute("/music/library/more")({
  component: MoreRouteComponent,
  head: () => ({ meta: [{ title }] }),
  beforeLoad: () => {
    const header: HeaderState = {
      title,
      rightButton: { kind: "submit", label: "Save", formId: SUBSONIC_FORM_ID },
    };
    return { header };
  },
});

function MoreRouteComponent() {
  const auth = useAuthContext();
  const initialSubsonicState = loadSubsonicConfig();
  async function saveSubsonicConfig(config: SubsonicFormValue) {
    await auth.subsonic.login(config);
  }

  return (
    <div className="content-scroll form-container">
      <SubsonicForm
        initialState={initialSubsonicState ?? {}}
        onSubmit={saveSubsonicConfig}
        setIsValid={(valid) => console.log({ valid })}
      />
      {auth.subsonic.state == null ? "Not logged in" : "Logged in"}
    </div>
  );
}
