import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/solicitacao')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/solicitacao"!</div>
}
