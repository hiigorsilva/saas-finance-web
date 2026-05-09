import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from '@tanstack/react-router'
import { useEffect, useState } from 'react'
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
  const [pathSelected, setPathSelected] = useState(false)
  const location = useLocation()

  const currentPath = location.pathname
  const selectedLink = navigateProfileMenuLinks.find(
    link => link.href === currentPath
  )

  const styleMenuLink = (href: string) => {
    return pathSelected && selectedLink?.href === href
      ? 'font-normal text-foreground'
      : 'text-muted-foreground'
  }

  useEffect(() => {
    if (selectedLink) {
      setPathSelected(true)
    }
  }, [selectedLink])

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
                        className={`flex justify-start items-center gap-2 px-4 py-2 rounded-sm border transition ${selectedLink && selectedLink.href === link.href ? 'bg-accent' : 'hover:bg-accent'}`}
                      >
                        <span className={styleMenuLink(link.href)}>
                          {link.icon}
                        </span>

                        <span
                          className={`${styleMenuLink(link.href)} text-base`}
                        >
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
