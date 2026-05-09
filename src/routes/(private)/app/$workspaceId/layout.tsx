import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Screen } from '@/components/layout/screen'
import { Header } from '../-components/header'

export const Route = createFileRoute('/(private)/app/$workspaceId')({
  component: WorkspaceLayout,
})

function WorkspaceLayout() {
  const { workspaceId } = Route.useParams()

  return (
    <Screen>
      <Header workspaceId={workspaceId} />
      <Outlet />
    </Screen>
  )
}
