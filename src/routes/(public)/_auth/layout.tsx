import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Screen } from '@/components/layout/screen'

export const Route = createFileRoute('/(public)/_auth')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <Screen>
      <Outlet />
    </Screen>
  )
}
