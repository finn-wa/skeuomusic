import SubsonicForm, { SUBSONIC_FORM_ID } from "@/components/subsonic-form/subsonic-form";
import { useAuthContext } from "@/shared/context/auth";
import { useHeaderContext, type HeaderState } from "@/shared/context/header";
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
  const { setHeaderState } = useHeaderContext();

  return (
    <div className="content-scroll">
      <SubsonicForm />
    </div>
  );
}
