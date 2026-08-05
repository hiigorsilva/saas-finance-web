import { createFileRoute } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'
import { useEffect } from 'react'
import { Container } from '@/components/layout/container'
import { Loading } from '@/components/layout/loading'
import { TitleIconPage } from '@/components/layout/title-icon-page'
import { TitlePage } from '@/components/layout/title-page'
import { useAuth } from '@/contexts/auth-context'
import { ROLE_MEMBER_WORKSPACE_TYPE } from '@/data/labels/role-member-workspace'
import { WORKSPACE_TYPE } from '@/data/labels/workspace-type'
import { useUserLoggedQuery } from '@/hooks/queries/use-user-logged-query'
import {
  useGetMemberByIdOfWorkspaceQuery,
  useWorkspaceIdQuery,
} from '@/hooks/queries/use-workspaces-query'
import { DetailsItemDeleteWorkspace } from './-components/details-item-delete-workspace'
import { DetailsItemInfo } from './-components/details-item-info'
import { DetailsItemInvite } from './-components/details-item-invite'
import { DetailsItemInviteTable } from './-components/details-item-invite-table'

export const Route = createFileRoute('/(private)/app/$workspaceId/details/')({
  component: WorkspaceDetailsPage,
})

function WorkspaceDetailsPage() {
  const route = Route.useNavigate()
  const { workspaceId } = Route.useParams()

  const { signOut } = useAuth()

  const { data: workspace, isLoading } = useWorkspaceIdQuery(workspaceId)
  const { data: userLogged, isLoading: isUserLoggedLoading } =
    useUserLoggedQuery()

  useEffect(() => {
    if (!isUserLoggedLoading && !userLogged) {
      signOut()
    }
  }, [isUserLoggedLoading, userLogged, signOut])

  const { data: member } = useGetMemberByIdOfWorkspaceQuery(
    workspaceId,
    userLogged?.id ?? ''
  )

  if (isLoading) return <Loading />
  if (!workspace) return null

  const handleNavigateBack = () => {
    route({
      to: '/app',
      params: { workspaceId: workspaceId },
    })
  }

  function handleCanDeleteWorkspace(roleMember: string) {
    if (roleMember === ROLE_MEMBER_WORKSPACE_TYPE.OWNER) return true
    if (roleMember === ROLE_MEMBER_WORKSPACE_TYPE.ADMIN) return true
    return false
  }

  function handleCanUpdateMembers(roleMember: string) {
    if (roleMember === ROLE_MEMBER_WORKSPACE_TYPE.OWNER) return true
    if (roleMember === ROLE_MEMBER_WORKSPACE_TYPE.ADMIN) return true
    return false
  }

  function handleCanUpdateWorkspace(roleMember: string) {
    if (roleMember === ROLE_MEMBER_WORKSPACE_TYPE.OWNER) return true
    return false
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
        <DetailsItemInfo
          workspace={workspace}
          onCanUpdateWorkspace={handleCanUpdateWorkspace(member?.role ?? '')}
        />
        <div className="flex justify-between items-start gap-3">
          <DetailsItemInviteTable
            members={workspace.members}
            onCanUpdateMembers={handleCanUpdateMembers(member?.role ?? '')}
          />
          {member?.role === ROLE_MEMBER_WORKSPACE_TYPE.OWNER &&
            workspace.type === WORKSPACE_TYPE.SHARED && (
              <DetailsItemInvite workspace={workspace} />
            )}
        </div>
        {handleCanDeleteWorkspace(member?.role ?? '') && (
          <DetailsItemDeleteWorkspace workspace={workspace} />
        )}
      </div>
    </Container>
  )
}
