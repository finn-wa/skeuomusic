import {
  Resource,
  component$,
  useContext,
  useResource$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { AlphabetList } from "~/components/alphabet-list/alphabet-list";
import { PageMessage } from "~/components/page-message/page-message";
import { SpotifyAuthContext } from "~/routes/layout";

export default component$(() => {
  const spotify = useContext(SpotifyAuthContext);
  const tracksResource = useResource$(async ({ cache, track }) => {
    cache("immutable");
    track(() => spotify.token?.access_token);
    if (spotify.api == null) {
      throw Error("spotify sdk undefined");
    }
    const res = await spotify.api.currentUser.tracks.savedTracks(50, 0);
    return res.items.map(({ track }) => ({ key: track.id, title: track.name }));
  });

  return (
    <Resource
      value={tracksResource}
      onPending={() => <PageMessage message="Loading..." />}
      onResolved={(value) => (
        <AlphabetList items={{ value }} namePlural="songs" />
      )}
      onRejected={(reason) => {
        console.error(reason);
        return (
          <PageMessage
            message={reason.cause?.toString() ?? "An error occurred"}
          />
        );
      }}
    />
  );
});

export const head: DocumentHead = {
  title: "Songs",
};
