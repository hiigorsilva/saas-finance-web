import { createFileRoute } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { Container } from '@/components/layout/container'
import { TitlePage } from '@/components/layout/title-page'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useWorkspacesQuery } from '@/hooks/queries/use-workspaces-query'
import { normalizeApiError } from '@/services/api/errors'
import { SkeletonHomePage } from '../-components/skeleton-home-page'
import { AddWorkspaceButton } from './-components/add-workspace-button'
import { Header } from './-components/header'
import { WorkspaceCard } from './-components/workspace-card'
import { WorkspaceListEmpty } from './-components/workspace-list-empty'
import { WorkspaceSearchFilterForm } from './-components/workspace-search-filter-form'

export const Route = createFileRoute('/(private)/app/')({
  component: WorkspacesPage,
  loader: SkeletonHomePage,
  head: () => ({
    meta: [
      {
        title: 'Overview | Luna',
      },
    ],
  }),
})

function WorkspacesPage() {
  const { data: workspaces, error } = useWorkspacesQuery(1, 20)

  useEffect(() => {
    if (!error) return

    const apiError = normalizeApiError(error)
    toast.error(apiError.message)
  }, [error])

  if (!workspaces) return <SkeletonHomePage />

  return (
    <>
      <Header hiddenLinks />

      <Container className="space-y-6">
        <div className="mt-6">
          <TitlePage>Meus Workspaces</TitlePage>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between items-center gap-6">
          <div className="max-w-72 w-full">
            <WorkspaceSearchFilterForm />
          </div>

          <AddWorkspaceButton>
            <Button
              variant="gradient"
              className="drop-shadow-md hover:drop-shadow-none"
            >
              <PlusIcon
                className="size-5 shrink-0 text-foreground"
                strokeWidth={1.5}
              />

              <span className="text-sm text-foreground">
                Criar novo Workspace
              </span>
            </Button>
          </AddWorkspaceButton>
        </div>

        <Separator />

        {/* LIST WORKSPACES */}
        {workspaces.props.totalCount === 0 && <WorkspaceListEmpty />}

        {workspaces.props.totalCount > 0 && (
          <ul className="w-full flex-auto grid grid-cols-3 gap-4">
            {workspaces.data.map(workspace => (
              <li className="w-full h-fit" key={workspace.id}>
                <WorkspaceCard workspace={workspace} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  )
}
