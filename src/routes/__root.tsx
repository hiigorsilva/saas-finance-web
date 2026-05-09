import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { NotFoundPage } from '@/components/layout/not-found'
import { Screen } from '@/components/layout/screen'
import { Toaster } from '@/components/ui/sonner'

export const Route = createRootRoute({
  component: RootLayout,
  head: () => ({
    meta: [
      {
        title: 'Luna | Sua assistente financeira',
        content:
          'Registre todas as suas receitas e desepesas e tome o controle da sua vida financeira.',
      },
    ],
  }),
  notFoundComponent: NotFoundPage,
})

function RootLayout() {
  return (
    <>
      <HeadContent />
      <Screen>
        <Outlet />
        <Toaster richColors theme="light" position="top-right" />
      </Screen>
      <TanStackRouterDevtools />
    </>
  )
}
