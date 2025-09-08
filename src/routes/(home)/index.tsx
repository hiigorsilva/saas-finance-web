import { createFileRoute } from '@tanstack/react-router'
import { Container } from '@/components/layout/container'

export const Route = createFileRoute('/(home)/')({
  component: Home,
})

function Home() {
  return (
    <div>
      <Container>
        <h1>Home Page</h1>
      </Container>
    </div>
  )
}
