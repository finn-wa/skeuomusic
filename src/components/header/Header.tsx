import { title } from "~/state/title";

// https://docs.solidjs.com/solid-start/building-your-application/head-and-metadata
export default function Header() {
  return (
    <header class="bar emboss-y">
      <h1>{title()}</h1>
    </header>
  );
}
