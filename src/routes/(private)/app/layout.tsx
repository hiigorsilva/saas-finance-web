import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Screen } from '@/components/layout/screen'

export const Route = createFileRoute('/(private)/app')({
  component: AppLayout,
})

function AppLayout() {
  return (
    <Screen>
      <header className="min-h-10 flex justify-center items-center bg-primary">
        <h1>Luna</h1>
      </header>
      <Outlet />
    </Screen>
  )
}
