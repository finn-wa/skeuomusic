import { createFileRoute } from "@tanstack/solid-router";

const title = "More";
export const Route = createFileRoute("/music/library/more")({
  component: More,
  head: () => ({ meta: [{ title }] }),
  beforeLoad: () => ({ header: { title } }),
});

export default function More() {
  return (
    <>
      <p>More</p>
    </>
  );
}
