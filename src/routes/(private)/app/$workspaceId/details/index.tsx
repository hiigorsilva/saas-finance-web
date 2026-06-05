import { createFileRoute } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Loading } from '@/components/layout/loading'
import { TitleIconPage } from '@/components/layout/title-icon-page'
import { TitlePage } from '@/components/layout/title-page'
import { useWorkspaceIdQuery } from '@/hooks/queries/use-workspaces-query'
import { DetailsItemDeleteWorkspace } from './-components/details-item-delete-workspace'
import { DetailsItemInfo } from './-components/details-item-info'
import { DetailsItemInvite } from './-components/details-item-invite'

export const Route = createFileRoute('/(private)/app/$workspaceId/details/')({
  component: WorkspaceDetailsPage,
})

function WorkspaceDetailsPage() {
  const route = Route.useNavigate()
  const { workspaceId } = Route.useParams()

  const { data: workspace, isLoading } = useWorkspaceIdQuery(workspaceId)

  if (isLoading) return <Loading />
  if (!workspace) return null

  const handleNavigateBack = () => {
    route({
      to: '/app',
      params: { workspaceId: workspaceId },
    })
  }

  return (
    <Container className="gap-6 pb-8">
      {/* TITLE PAGE */}
      <div className="flex justify-start items-center gap-2 mt-6">
        <TitleIconPage handleNavigateBack={handleNavigateBack}>
          <ChevronLeftIcon />
        </TitleIconPage>
        <TitlePage>Detalhes do Workspace</TitlePage>
      </div>

      <div className="flex flex-auto flex-col gap-6">
        <DetailsItemInfo workspace={workspace} />
        <DetailsItemInvite />
        <DetailsItemDeleteWorkspace workspace={workspace} />
      </div>
    </Container>
  )
}
