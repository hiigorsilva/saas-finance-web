import { useMutation, useQueryClient } from '@tanstack/react-query'
import { WorkspaceService } from '@/services/workspace/workspace'
import type { UpdateMemberToWorkspacePayload } from '@/services/workspace/workspace.d'
import { workspacesQueryKey } from '../queries/use-workspaces-query'

export function useUpdateMemberWorkspaceMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      workspaceId,
      memberId,
      role,
    }: UpdateMemberToWorkspacePayload) =>
      WorkspaceService.UpdateMemberOfWorkspace({ memberId, role, workspaceId }),
    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...workspacesQueryKey, variables.workspaceId],
      })
    },
  })
}
