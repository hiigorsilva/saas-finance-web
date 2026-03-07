import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { Screen } from '@/components/layout/screen'
import { getStorageToken } from '@/utils/auth.storage'

export const Route = createFileRoute('/(private)')({
  beforeLoad: () => {
    if (!getStorageToken()) {
      throw redirect({ to: '/login', replace: true })
    }
  },
  component: PrivateLayout,
})

function PrivateLayout() {
  return (
    <Screen>
      <Outlet />
    </Screen>
  )
}
