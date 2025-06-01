import {
  Resource,
  type ResourceCtx,
  component$,
  isServer,
  useContext,
  useResource$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { SavedAlbum } from "@spotify/web-api-ts-sdk";
import { ListItem } from "~/components/list-item/list-item";
import { SpotifyAuthContext } from "~/routes/layout";

export default component$(() => {
  const spotify = useContext(SpotifyAuthContext);
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
    return res.items.sort((a, b) => a.album.name.localeCompare(b.album.name));
  });

  return (
    <>
      <Resource
        value={albumsResource}
        onPending={() => <span>Loading...</span>}
        onResolved={(albums) => (
          <ul>
            <h2>
              {albums.map(({ album }) => (
                <ListItem key={album.id} title={album.name} />
              ))}
            </h2>
          </ul>
        )}
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
