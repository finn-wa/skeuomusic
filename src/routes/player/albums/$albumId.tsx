import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/player/albums/$albumId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/player/albums/$albumId"!</div>
}
