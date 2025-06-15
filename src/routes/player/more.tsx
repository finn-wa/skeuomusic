import { createFileRoute } from "@tanstack/solid-router";

const title = "More";
export const Route = createFileRoute("/player/more")({
  component: More,
  head: () => ({ meta: [{ title }] }),
  beforeLoad: () => ({ headerTitle: title }),
});

export default function More() {
  return (
    <>
      <p>More</p>
    </>
  );
}
