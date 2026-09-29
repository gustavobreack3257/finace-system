import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reembolso/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/reembolso/$id"!</div>
}
