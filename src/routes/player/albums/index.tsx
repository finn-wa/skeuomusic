import { Resource, component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { AlphabetList } from "~/components/alphabet-list/alphabet-list";
import { PageMessage } from "~/components/page-message/page-message";

export const useAlbums = routeLoader$(async ({ sharedMap }) => {
  const api = sharedMap.get("spotifyApi") as SpotifyApi;
  if (api == null) {
    throw new Error("spotifyApi is not in sharedMap");
  }
  const res = await api.currentUser.albums.savedAlbums(50, 0);
  return res.items.map(({ album }) => ({ key: album.id, title: album.name }));
});

export default component$(() => {
  const albums = useAlbums();

  return (
    <Resource
      value={albums}
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
