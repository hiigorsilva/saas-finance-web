import { createFileRoute } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { TitlePage } from '@/components/layout/title-page'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { workspaceResponse } from '@/data/requests/workspaces'
import { Header } from './-components/header'
import { WorkspaceCard } from './-components/workspace-card'
import { WorkspaceListEmpty } from './-components/workspace-list-empty'
import { WorkspaceSearchFilterForm } from './-components/workspace-search-filter-form'

export const Route = createFileRoute('/(private)/app/')({
  component: WorkspacesPage,
  head: () => ({
    meta: [
      {
        title: 'Overview | Luna',
      },
    ],
  }),
})

function WorkspacesPage() {
  const { data, totalCount } = workspaceResponse.body

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
        </div>

        <Separator />

        {/* LIST WORKSPACES */}
        {totalCount === 0 && <WorkspaceListEmpty />}

        {totalCount > 0 && (
          <ul className="w-full flex-auto grid grid-cols-3 gap-4">
            {data.map(workspace => (
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
