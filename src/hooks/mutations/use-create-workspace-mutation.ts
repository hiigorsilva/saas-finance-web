import { useMutation, useQueryClient } from '@tanstack/react-query'
import { workspacesQueryKey } from '@/hooks/queries/use-workspaces-query'
import type { AddWorkspaceFormType } from '@/schemas/add-workspace-button'
import { WorkspaceService } from '@/services/workspace/workspace'

export function useCreateWorkspaceMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: AddWorkspaceFormType) =>
      WorkspaceService.PostWorkspace(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspacesQueryKey })
    },
  })
}
