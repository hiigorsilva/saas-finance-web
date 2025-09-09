import { Link, useLocation } from '@tanstack/react-router'
import type { ComponentProps } from 'react'
import { Container } from '@/components/layout/container'
import { WorkspaceSwitcher } from '@/routes/_app/-components/workspace-switcher'
import { navigate } from '../-data/navigate-links'

type HeaderProps = ComponentProps<'header'> & {
  hiddenLinks?: boolean
}

export function Header({ hiddenLinks = false }: HeaderProps) {
  const location = useLocation()
  const { pathname } = location

  return (
    <header className="py-4 border">
      <Container>
        <nav className="flex justify-between items-center gap-6">
          <WorkspaceSwitcher />

          {!hiddenLinks && (
            <ul className="flex justify-start items-center gap-4 w-full">
              {navigate.map(link => (
                <li key={link.title} className="w-fit h-fit">
                  <Link
                    className={`font-semibold text-base ${pathname === link.href ? 'text-foreground' : 'text-muted-foreground'} px-2 py-1 rounded-md hover:bg-secondary/50`}
                    to={link.href}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </Container>
    </header>
  )
}
