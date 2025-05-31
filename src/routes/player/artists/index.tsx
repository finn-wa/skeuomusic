import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  routeLoader$,
  server$,
} from "@builder.io/qwik-city";
import { ListItem } from "~/components/list-item/list-item";

type Artist = { name: string };

export const getArtists = server$(async (query: string): Promise<Artist[]> => {
  return [];
});

export const useArtists = routeLoader$(async () => {
  return getArtists("e");
});

export default component$(() => {
  // TODO: make this a resource that uses the spotify api context
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
