import { useNavigate } from '@tanstack/react-router'
import type { ComponentProps } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useDeleteWorkspaceMutation } from '@/hooks/mutations/use-deletar-workspace-mutation'
import { normalizeApiError } from '@/services/api/errors'
import type { IWorkspace } from '@/services/workspace/workspace.d'

type DeleteWorkspaceDialogProps = ComponentProps<'button'> & {
  workspace: IWorkspace
}

export function DeleteWorkspaceDialog({
  children,
  workspace,
}: DeleteWorkspaceDialogProps) {
  const { mutateAsync: deleteWorkspace } = useDeleteWorkspaceMutation()
  const navigate = useNavigate()

  async function handleDeleteWorkspace() {
    try {
      const res = await deleteWorkspace({ workspaceId: workspace.id })
      if (res) {
        toast.success('Workspace deletado com sucesso!')
        navigate({ to: '/app', replace: true })
      }
    } catch (error) {
      const apiError = normalizeApiError(error)
      toast.error(apiError.message)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar Workspace</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir o workspace{' '}
            <span className="font-semibold text-foreground">
              "{workspace.name.toLocaleUpperCase()}"
            </span>
            ? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between items-center gap-2">
          <DialogClose asChild>
            <Button variant={'outline'} className="flex-auto">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant={'destructive'}
            className="flex-auto"
            onClick={handleDeleteWorkspace}
          >
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
