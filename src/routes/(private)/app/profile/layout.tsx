import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { Container } from '@/components/layout/container'
import { Screen } from '@/components/layout/screen'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Header } from '../-components/header'
import { navigateProfileMenuLinks } from './-data/navigate-profile-menu-links'

export const Route = createFileRoute('/(private)/app/profile')({
  component: ProfileLayout,
})

function ProfileLayout() {
  return (
    <Screen>
      <Header hiddenLinks />
      <Container>
        <div className="flex-auto grid grid-cols-4 gap-6 py-6">
          <Card className="col-span-1 gap-4">
            <CardHeader>
              <CardTitle>Gerenciar meu perfil</CardTitle>
            </CardHeader>

            <Separator />

            <CardContent className="p-4">
              <nav>
                <ul className="flex flex-col gap-2">
                  {navigateProfileMenuLinks.map(link => (
                    <li key={link.title}>
                      <Link
                        to={link.href}
                        className="flex justify-start items-center gap-2 px-4 py-2 rounded-sm border transition hover:bg-accent"
                      >
                        {link.icon}

                        <span className="text-base text-foreground">
                          {link.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </CardContent>
          </Card>

          <div className="col-span-3 flex flex-col gap-6">
            <Outlet />
          </div>
        </div>
      </Container>
    </Screen>
  )
}
