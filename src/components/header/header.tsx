import { component$ } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";

export const Header = component$(() => {
  const head = useDocumentHead();
  return (
    <header class="bar emboss-y">
      <h1>{head.title}</h1>
    </header>
  );
});
