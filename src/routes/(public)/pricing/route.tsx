import { createFileRoute } from '@tanstack/react-router'
import { Container } from '@/components/layout/container'
import { Screen } from '@/components/layout/screen'
import { Header } from '../../(private)/app/-components/header'

export const Route = createFileRoute('/(public)/pricing')({
  component: PricingPage,
})

function PricingPage() {
  return (
    <Screen>
      <Header />
      <Container>
        <h1>Pricing Page</h1>
      </Container>
    </Screen>
  )
}
