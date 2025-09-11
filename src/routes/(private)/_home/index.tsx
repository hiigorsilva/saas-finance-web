import { createFileRoute, Link } from '@tanstack/react-router'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/(private)/_home/')({
  component: HomePage,
})

function HomePage() {
  return (
    <Container className="space-y-6">
      <h1>Página Inicial</h1>
      <Button className="w-fit" variant="gradient" asChild>
        <Link to="/app">Ir para Meus Workspaces</Link>
      </Button>
    </Container>
  )
}
