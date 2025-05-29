import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <div>Playlists</div>;
});

export const head: DocumentHead = {
  title: "Playlists",
};
