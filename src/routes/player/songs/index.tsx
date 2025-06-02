import {
  Resource,
  type ResourceCtx,
  component$,
  isServer,
  useContext,
  useResource$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { SavedTrack } from "@spotify/web-api-ts-sdk";
import { ListItem } from "~/components/list-item/list-item";
import { SpotifyAuthContext } from "~/routes/layout";

export default component$(() => {
  const spotify = useContext(SpotifyAuthContext);
  const tracksResource = useResource$<SavedTrack[]>(async (ctx) => {
    const { cache, track } = ctx as ResourceCtx<SavedTrack[]>;
    cache("immutable");
    track(() => spotify.token?.access_token);
    if (isServer) {
      return [];
    }
    if (spotify.api == null) {
      throw Error("spotify sdk undefined");
    }
    const res = await spotify.api.currentUser.tracks.savedTracks(50, 0);
    return res.items.sort((a, b) => a.track.name.localeCompare(b.track.name));
  });

  return (
    <>
      <Resource
        value={tracksResource}
        onPending={() => <span>Loading...</span>}
        onResolved={(tracks) => (
          <ul>
            {tracks.map(({ track }) => (
              <ListItem key={track.id} title={track.name} />
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
  title: "Songs",
};
