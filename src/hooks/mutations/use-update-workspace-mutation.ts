import { useMutation, useQueryClient } from '@tanstack/react-query'
import { WorkspaceService } from '@/services/workspace/workspace'
import { workspacesQueryKey } from '../queries/use-workspaces-query'

type UpdateWorkspacePayload = {
  workspaceId: string
  name: string | undefined
  slug: string | undefined
  type: 'PRIVATE' | 'SHARED' | undefined
  description: string | undefined
}

export function useUpdateWorkspaceMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      workspaceId,
      name,
      slug,
      type,
      description,
    }: UpdateWorkspacePayload) =>
      WorkspaceService.PutWorkspace(workspaceId, {
        name,
        slug,
        type,
        description,
      }),
    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...workspacesQueryKey, variables.workspaceId],
      })
    },
  })
}
