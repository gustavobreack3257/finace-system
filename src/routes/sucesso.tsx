import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sucesso')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/sucesso"!</div>
}
