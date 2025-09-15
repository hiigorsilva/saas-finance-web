import { createFileRoute } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { TitleIconPage } from '@/components/layout/title-icon-page'
import { TitlePage } from '@/components/layout/title-page'

import { monthSelectSchema } from '@/schemas/dashboard-select-time'
import { DashboardTimeSelect } from './components/dashboard-time-select'

export const Route = createFileRoute('/(private)/app/$workspaceId/')({
  component: DashboardPage,
  validateSearch: monthSelectSchema,
  head: () => ({
    meta: [
      {
        title: 'Dashboard | Luna',
      },
    ],
  }),
})

function DashboardPage() {
  const router = Route.useNavigate()
  const match = Route.useMatch()

  const handleNavigateBack = () => {
    router({
      to: '/app',
    })
  }

  return (
    <Container className="space-y-6">
      <div className="flex justify-between items-center gap-6 mt-6">
        {/* TITLE */}
        <div className="flex items-center gap-2">
          <TitleIconPage handleNavigateBack={handleNavigateBack}>
            <ChevronLeftIcon />
          </TitleIconPage>
          <TitlePage>Dashboard</TitlePage>
        </div>

        {/* DATE FILTER */}
        <div className="flex items-center gap-4">
          <DashboardTimeSelect search={match.search} />
        </div>
      </div>
    </Container>
  )
}
