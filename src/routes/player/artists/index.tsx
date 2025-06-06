import {
  Resource,
  component$,
  useContext,
  useResource$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { AlphabetList } from "~/components/alphabet-list/alphabet-list";
import { PageMessage } from "~/components/page-message/page-message";
import { SpotifyAuthContext } from "../layout";

export default component$(() => {
  const spotify = useContext(SpotifyAuthContext);
  const artistsResource = useResource$(async ({ cache, track }) => {
    cache("immutable");
    track(() => spotify.token?.access_token);
    if (spotify.api == null) {
      throw new Error("spotify sdk undefined");
    }
    const res = await spotify.api.currentUser.followedArtists(undefined, 50);
    return res.artists.items.map(({ id, name }) => ({ key: id, title: name }));
  });

  return (
    <Resource
      value={artistsResource}
      onPending={() => <PageMessage message="Loading..." />}
      onResolved={(value) => (
        <AlphabetList items={{ value }} namePlural="artists" />
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
  title: "Artists",
};
