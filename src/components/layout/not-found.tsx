import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { Container } from './container'

export function NotFoundPage() {
  return (
    <Container className="flex flex-col justify-center items-center gap-4">
      <h2 className="font-semibold text-2xl text-foreground leading-none">
        Página não encontrada!
      </h2>
      <Button variant="gradient" asChild>
        <Link to="/app">Voltar ao início</Link>
      </Button>
    </Container>
  )
}
