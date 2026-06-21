import { useAuth } from "@/auth";
import PageMessage from "@/components/page-message/page-message";
import SubsonicForm from "@/components/subsonic-form/subsonic-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/music/library/more")({
  component: MoreRouteComponent,
});

function MoreRouteComponent() {
  const auth = useAuth();
  return (
    <div className="content-scroll">
      <SubsonicForm />
    </div>
  );
}
