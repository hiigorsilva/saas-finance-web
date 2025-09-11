import { createFileRoute, Link } from '@tanstack/react-router'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/(private)/app/$workspaceId/')({
  component: DashboardPage,
  head: () => ({
    meta: [
      {
        title: 'Dashboard | Luna',
      },
    ],
  }),
})

function DashboardPage() {
  const { workspaceId } = Route.useParams()

  return (
    <Container className="space-y-6">
      <h1>Página de Dashboard</h1>
      <Button className="w-fit" variant="gradient" asChild>
        <Link
          to="/app/$workspaceId/transaction"
          params={{ workspaceId: workspaceId }}
        >
          Ir para Transações
        </Link>
      </Button>

      <Button className="w-fit" variant="outline" asChild>
        <Link to="..">Voltar para Meus Workspaces</Link>
      </Button>
    </Container>
  )
}
