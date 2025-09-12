import { createFileRoute } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { TitleIconPage } from '@/components/layout/title-icon-page'
import { TitlePage } from '@/components/layout/title-page'

export const Route = createFileRoute('/(private)/app/$workspaceId/details/')({
  component: WorkspaceDetailsPage,
})

function WorkspaceDetailsPage() {
  const route = Route.useNavigate()
  const { workspaceId } = Route.useParams()

  const handleNavigateBack = () => {
    route({
      to: '/app',
      params: { workspaceId: workspaceId },
    })
  }

  return (
    <Container>
      <div className="flex justify-start items-center gap-2 mt-6">
        <TitleIconPage handleNavigateBack={handleNavigateBack}>
          <ChevronLeftIcon />
        </TitleIconPage>

        <TitlePage>Detalhes do Workspace</TitlePage>
      </div>
    </Container>
  )
}
