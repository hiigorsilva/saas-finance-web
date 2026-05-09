import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { Screen } from '@/components/layout/screen'
import { getStorageToken } from '@/utils/auth.storage'

export const Route = createFileRoute('/(public)/_auth')({
  beforeLoad: () => {
    if (getStorageToken()) {
      throw redirect({ to: '/', replace: true })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <Screen>
      <Outlet />
    </Screen>
  )
}
