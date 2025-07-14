import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/music/player/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/music/player/"!</div>
}
