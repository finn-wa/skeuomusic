import {
  Resource,
  type ResourceCtx,
  component$,
  isServer,
  useContext,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { SavedAlbum } from "@spotify/web-api-ts-sdk";
import {
  AlphabetList,
  type AlphabetListItem,
} from "~/components/alphabet-list/alphabet-list";
import { SpotifyAuthContext } from "~/routes/layout";

export default component$(() => {
  const spotify = useContext(SpotifyAuthContext);
  const itemsSignal = useSignal<AlphabetListItem[]>([]);
  const albumsResource = useResource$<SavedAlbum[]>(async (ctx) => {
    const { cache, track } = ctx as ResourceCtx<SavedAlbum[]>;
    cache("immutable");
    track(() => spotify.token?.access_token);
    if (isServer) {
      return [];
    }
    if (spotify.api == null) {
      throw Error("spotify sdk undefined");
    }
    const res = await spotify.api.currentUser.albums.savedAlbums(50, 0);
    const albums = res.items.sort((a, b) =>
      a.album.name.localeCompare(b.album.name),
    );
    itemsSignal.value = albums.map(({ album }) => ({
      key: album.id,
      title: album.name,
    }));
    return albums;
  });

  return (
    <>
      <Resource
        value={albumsResource}
        onPending={() => <span>Loading...</span>}
        onResolved={() => <AlphabetList items={itemsSignal} />}
        onRejected={(reason) => {
          console.error(reason);
          return <span>{JSON.stringify(reason, null, 2)}</span>;
        }}
      />
    </>
  );
});

export const head: DocumentHead = {
  title: "Albums",
};
