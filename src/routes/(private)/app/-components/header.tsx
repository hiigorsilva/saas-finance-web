import { Link } from '@tanstack/react-router'
import { Container } from '@/components/layout/container'
import { navigateMenuLinks } from '../-data/navigate-menu-links'
import { ProfileDropdownMenu } from './profile-dropdown-menu'
import { WorkspaceNotification } from './workspace-notification'
import { WorkspaceSwitcher } from './workspace-switcher'

type HeaderProps = {
  hiddenLinks?: boolean
  workspaceId?: string
}

export function Header({ hiddenLinks = false, workspaceId }: HeaderProps) {
  return (
    <header className="w-h-full border-b py-4">
      <Container>
        <div className="flex justify-between items-center gap-6">
          <WorkspaceSwitcher />

          {!hiddenLinks && (
            <ul className="w-full flex justify-start items-center gap-4">
              {navigateMenuLinks.map(link => (
                <li key={link.title}>
                  <Link
                    to={link.href}
                    params={{ workspaceId: workspaceId ?? '' }}
                    className="inline-flex font-semibold text-base text-foreground p-2"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center gap-4">
            <WorkspaceNotification />

            <ProfileDropdownMenu />
          </div>
        </div>
      </Container>
    </header>
  )
}
