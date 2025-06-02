import {
  Resource,
  type ResourceCtx,
  component$,
  isServer,
  useContext,
  useResource$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
import { ListItem } from "~/components/list-item/list-item";
import { SpotifyAuthContext } from "~/routes/layout";

export default component$(() => {
  const spotify = useContext(SpotifyAuthContext);
  const playlistsResource = useResource$<SimplifiedPlaylist[]>(async (ctx) => {
    const { cache, track } = ctx as ResourceCtx<[]>;
    cache("immutable");
    track(() => spotify.token?.access_token);
    if (isServer) {
      return [];
    }
    if (spotify.api == null) {
      throw Error("spotify sdk undefined");
    }
    const res = await spotify.api.currentUser.playlists.playlists(50, 0);
    console.log({ res });
    return res.items.sort((a, b) => a.name.localeCompare(b.name));
  });

  return (
    <>
      <Resource
        value={playlistsResource}
        onPending={() => <span>Loading...</span>}
        onResolved={(playlists) => (
          <ul>
            {playlists.map((playlist) => (
              <ListItem key={playlist.id} title={playlist.name} />
            ))}
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
  title: "Playlists",
};
