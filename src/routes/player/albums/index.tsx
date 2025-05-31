import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <div>Albums</div>;
});

export const head: DocumentHead = {
  title: "Albums",
};
