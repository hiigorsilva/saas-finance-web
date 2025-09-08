import { createFileRoute } from '@tanstack/react-router'
import { Screen } from '@/components/layout/screen'
import { Header } from '../-components/header'

export const Route = createFileRoute('/(app)/workspace')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Screen>
      <Header />
    </Screen>
  )
}
