import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Screen } from '@/components/layout/screen'
import { Header } from '../-components/header'

export const Route = createFileRoute('/(private)/app/profile')({
  component: ProfileLayout,
})

function ProfileLayout() {
  return (
    <Screen>
      <Header hiddenLinks />
      <Outlet />
    </Screen>
  )
}
