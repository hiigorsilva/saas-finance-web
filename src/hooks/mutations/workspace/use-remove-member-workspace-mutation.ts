import { useMutation, useQueryClient } from '@tanstack/react-query'
import { WorkspaceService } from '@/services/workspace/workspace'
import type { RemoveMemberToWorkspacePayload } from '@/services/workspace/workspace.d'
import { workspacesQueryKey } from '../../queries/use-workspaces-query'

export function useRemoveMemberWorkspaceMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ workspaceId, memberId }: RemoveMemberToWorkspacePayload) =>
      WorkspaceService.RemoveMemberOfWorkspace(workspaceId, memberId),
    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...workspacesQueryKey, variables.workspaceId],
      })
    },
  })
}
