import { createFileRoute } from '@tanstack/react-router'
import { Container } from '@/components/layout/container'

export const Route = createFileRoute('/(auth)/register')({
  component: RegisterPage,
})

function RegisterPage() {
  return (
    <Container>
      <h1>Página de Registro</h1>
    </Container>
  )
}
