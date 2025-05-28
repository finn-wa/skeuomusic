import { $, component$, useSignal } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { spotify } from "~/server/spotify";

export const searchAlbums = server$(async (query: string) => {
  const results = await spotify.search(query, ["album"], undefined, 1);
  const first = results.albums.items[0];
  return `${first.artists[0].name} - ${first.name}`;
});

export default component$(() => {
  const firstResultName = useSignal<string>("loading");
  return (
    <>
      <h1>skeuomusic</h1>
      <button
        type="button"
        onClick$={$(async () => {
          firstResultName.value = await searchAlbums("in rain");
        })}
      >
        Search for "in rain"
      </button>
      <p>{firstResultName.value}</p>
    </>
  );
});
