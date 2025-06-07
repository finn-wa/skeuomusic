import { component$, useContext } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { AlphabetList } from "~/components/alphabet-list/alphabet-list";
import { APP_STATE } from "~/constants";

export default component$(() => {
  const artists = useContext(APP_STATE).artists;
  return <AlphabetList items={{ value: artists }} namePlural="artists" />;
});

export const head: DocumentHead = {
  title: "Artists",
};
