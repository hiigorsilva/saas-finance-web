import { createFileRoute, Link } from '@tanstack/react-router'
import { Container } from '@/components/layout/container'
import { Screen } from '@/components/layout/screen'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/(public)/pricing/')({
  component: PricingPage,
})

function PricingPage() {
  return (
    <Screen>
      <Container>
        <h1>Pricing Page</h1>

        <Button className="w-fit" variant="gradient" asChild>
          <Link from="/pricing/" to="/app">
            Ir para o início
          </Link>
        </Button>
      </Container>
    </Screen>
  )
}
