import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { IWorkspace } from '@/services/workspace/workspace.d'
import { DeleteWorkspaceDialog } from './delete-workspace-dialog'

type DetailsItemDeleteWorkspaceProps = {
  workspace: IWorkspace
}

export function DetailsItemDeleteWorkspace({
  workspace,
}: DetailsItemDeleteWorkspaceProps) {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center gap-6">
        <CardTitle>Deletar workspace</CardTitle>
        <DeleteWorkspaceDialog workspace={workspace}>
          <Button variant={'destructive'} className="leading-none">
            Excluir Workspace
          </Button>
        </DeleteWorkspaceDialog>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <Separator />
        <p className="text-base text-muted-foreground">
          Exclua este workspace permanentemente e todas as transações associadas
          a ele.
        </p>

        <Card className="min-w-2xs w-fit flex flex-col gap-2 p-3">
          <h3 className="font-semibold text-base text-foreground tracking-tight">
            {workspace.name}
          </h3>
          {workspace.description && (
            <p className="text-sm text-muted-foreground">
              {workspace.description}
            </p>
          )}
        </Card>
      </CardContent>
    </Card>
  )
}
