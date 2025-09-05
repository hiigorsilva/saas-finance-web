import { createFileRoute } from '@tanstack/react-router'
import { Container } from '@/components/layout/container'

export const Route = createFileRoute('/(auth)/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div>
      <Container>
        <h1>Página de Login</h1>
      </Container>
    </div>
  )
}
