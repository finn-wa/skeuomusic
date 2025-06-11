import { createFileRoute } from "@tanstack/solid-router";
import { PageTitle } from "~/components/page-title/PageTitle";

export const Route = createFileRoute("/player/more")({
  component: More,
});

export default function More() {
  return (
    <>
      <PageTitle>More</PageTitle>
      <p>More</p>
    </>
  );
}
