import { Container } from '@/components/layout/container'
import { WorkspaceSwitcher } from '@/components/ui/workspace-switcher'

export function Header() {
  return (
    <header className="py-4 border">
      <Container>
        <nav>
          <WorkspaceSwitcher />
        </nav>
      </Container>
    </header>
  )
}
