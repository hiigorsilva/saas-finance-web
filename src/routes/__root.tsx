import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Screen } from '@/components/layout/screen'

export const Route = createRootRoute({ component: RootLayout })

function RootLayout() {
  return (
    <>
      <Screen>
        <Outlet />
      </Screen>
      <TanStackRouterDevtools />
    </>
  )
}
