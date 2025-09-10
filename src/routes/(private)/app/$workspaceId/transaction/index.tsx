import { createFileRoute, Link } from '@tanstack/react-router'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute(
  '/(private)/app/$workspaceId/transaction/'
)({
  component: TransactionPage,
})

function TransactionPage() {
  const { workspaceId } = Route.useParams()

  return (
    <Container className="space-y-6">
      <h1>Página de Transações</h1>

      <Button className="w-fit" variant="gradient" asChild>
        <Link to=".." params={{ workspaceId: workspaceId }}>
          Voltar para Dashboard
        </Link>
      </Button>
    </Container>
  )
}
