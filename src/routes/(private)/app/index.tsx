import { createFileRoute, Link } from '@tanstack/react-router'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { Header } from './-components/header'

export const Route = createFileRoute('/(private)/app/')({
  component: WorkspacesPage,
  head: () => ({
    meta: [
      {
        title: 'Overview | Luna',
      },
    ],
  }),
})

function WorkspacesPage() {
  return (
    <>
      <Header hiddenLinks />

      <Container className="space-y-6">
        <h1>Página dos Meus Workspaces</h1>
        <Button className="w-fit" variant="gradient" asChild>
          <Link to="/app/$workspaceId" params={{ workspaceId: 'buncker_id' }}>
            Ir para Dashboard
          </Link>
        </Button>
        <Button className="w-fit" variant="gradient" asChild>
          <Link to="/pricing">Ir para Página de Preços</Link>
        </Button>

        <Button className="w-fit" variant="outline" asChild>
          <Link to="..">Voltar para o início</Link>
        </Button>
      </Container>
    </>
  )
}
