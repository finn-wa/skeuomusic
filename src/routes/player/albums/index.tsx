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
  const albumsResource = useResource$(async ({ cache, track }) => {
    cache("immutable");
    track(() => spotify.token?.access_token);
    if (spotify.api == null) {
      throw new Error("spotify sdk undefined");
    }
    const res = await spotify.api.currentUser.albums.savedAlbums(50, 0);
    return res.items.map(({ album }) => ({ key: album.id, title: album.name }));
  });

  return (
    <Resource
      value={albumsResource}
      onPending={() => <PageMessage message="Loading..." />}
      onResolved={(value) => (
        <AlphabetList items={{ value }} namePlural="albums" />
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
  title: "Albums",
};
