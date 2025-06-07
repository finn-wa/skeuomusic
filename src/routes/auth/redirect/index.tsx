import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { doSpotifyAuth } from "~/providers/spotify";

function log(...obj: unknown[]) {
  console.log("src/routes/auth/redirect/index.tsx", ...obj);
}

export default component$(() => {
  const location = useLocation();
  const navigate = useNavigate();
  useVisibleTask$(async () => {
    if (location.url.searchParams.get("code") == null) {
      log("code query param is missing");
      return navigate("/login");
    }
    log("we've returned from a callback");
    const onAuthFailed = () => {
      log("auth failed, back to login");
      return navigate("/login");
    };
    const token = await doSpotifyAuth(location.url, onAuthFailed);
    if (token != null) {
      log("it was successful, setting cookie");
      return navigate("/player/albums");
    }
    log("User did not authorize");
    return navigate("/login");
  });

  return (
    <>
      <p>authorising...</p>
    </>
  );
});
