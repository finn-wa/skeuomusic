import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/player/more")({
  component: More,
  head: () => ({ meta: [{ title: "More" }] }),
});

export default function More() {
  return (
    <>
      <p>More</p>
    </>
  );
}
