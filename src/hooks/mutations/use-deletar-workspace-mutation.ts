import { useMutation, useQueryClient } from '@tanstack/react-query'
import { WorkspaceService } from '@/services/workspace/workspace'
import { workspacesQueryKey } from '../queries/use-workspaces-query'

type DeleteWorkspacePayload = {
  workspaceId: string
}

export function useDeleteWorkspaceMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ workspaceId }: DeleteWorkspacePayload) =>
      WorkspaceService.DeleteWorkspace(workspaceId),
    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...workspacesQueryKey, variables.workspaceId],
      })
    },
  })
}
