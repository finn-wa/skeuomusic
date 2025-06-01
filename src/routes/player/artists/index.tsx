import {
  Resource,
  type ResourceCtx,
  component$,
  isServer,
  useContext,
  useResource$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { Artist } from "@spotify/web-api-ts-sdk";
import { ListItem } from "~/components/list-item/list-item";
import { SpotifyAuthContext } from "~/routes/layout";

export default component$(() => {
  const spotify = useContext(SpotifyAuthContext);
  const artistsResource = useResource$<Artist[]>(async (ctx) => {
    const { cache, track } = ctx as ResourceCtx<Artist[]>;
    cache("immutable");
    track(() => spotify.token?.access_token);

    if (isServer) {
      return [];
    }
    if (spotify.api == null) {
      throw Error("spotify sdk undefined");
    }
    const res = await spotify.api.currentUser.followedArtists(undefined, 50);
    return res.artists.items.sort((a, b) => a.name.localeCompare(b.name));
  });

  return (
    <>
      <Resource
        value={artistsResource}
        onPending={() => <span>Loading...</span>}
        onResolved={(artists) => (
          <ul>
            <h2>
              {artists.map((artist) => (
                <ListItem key={artist.name} title={artist.name} />
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
  title: "Artists",
};
