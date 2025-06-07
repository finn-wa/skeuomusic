import { component$, useContext } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { AlphabetList } from "~/components/alphabet-list/alphabet-list";
import { APP_STATE } from "~/constants";

export default component$(() => {
  const albums = useContext(APP_STATE).albums;
  return <AlphabetList items={{ value: albums }} namePlural="albums" />;
});

export const head: DocumentHead = {
  title: "Albums",
};
