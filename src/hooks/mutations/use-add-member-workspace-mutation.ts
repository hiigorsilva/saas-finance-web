import { useMutation, useQueryClient } from '@tanstack/react-query'
import { workspacesQueryKey } from '@/hooks/queries/use-workspaces-query'
import { WorkspaceService } from '@/services/workspace/workspace'
import type { AddMemberToWorkspacePayload } from '@/services/workspace/workspace.d'

export function useAddMemberToWorkspaceMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: AddMemberToWorkspacePayload) =>
      WorkspaceService.AddMemberToWorkspace(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspacesQueryKey })
    },
  })
}
