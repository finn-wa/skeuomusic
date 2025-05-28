import { $, component$, useSignal } from "@builder.io/qwik";

import { routeLoader$, server$ } from "@builder.io/qwik-city";
import { ListItem } from "~/components/list-item/list-item";
import { spotify } from "~/server/spotify";

type Artist = { name: string };

export const getArtists = server$(async (query: string): Promise<Artist[]> => {
  const results = await spotify.search(query, ["artist"], undefined, 20);
  return results.artists.items.map(({ name }) => ({ name }));
});

export const useArtists = routeLoader$(async () => {
  return getArtists("the");
});

export default component$(() => {
  const artists = useArtists();

  return (
    <>
      <h1>artists</h1>
      <ul>
        {artists.value.map((artist) => (
          <ListItem key={artist.name} title={artist.name} />
        ))}
      </ul>
    </>
  );
});
