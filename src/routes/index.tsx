import { createFileRoute } from '@tanstack/react-router'
import { Container } from '@/components/layout/container'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div>
      <Container>
        <h1>Hello World</h1>
      </Container>
    </div>
  )
}
