import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  routeLoader$,
  server$,
} from "@builder.io/qwik-city";
import { ListItem } from "~/components/list-item/list-item";
import { spotify } from "~/server/spotify";

type Artist = { name: string };

export const getArtists = server$(async (query: string): Promise<Artist[]> => {
  const results = await spotify.search(query, ["artist"], undefined, 50);
  return results.artists.items
    .map(({ name }) => ({ name }))
    .sort((a, b) => a.name.localeCompare(b.name));
});

export const useArtists = routeLoader$(async () => {
  return getArtists("e");
});

export default component$(() => {
  const artists = useArtists();

  return (
    <>
      <ul>
        <h2>
          {artists.value.map((artist) => (
            <ListItem key={artist.name} title={artist.name} />
          ))}
        </h2>
      </ul>
    </>
  );
});

export const head: DocumentHead = {
  title: "Artists",
};
