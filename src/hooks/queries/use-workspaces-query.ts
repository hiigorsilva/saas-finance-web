import { useQuery } from '@tanstack/react-query'
import { WorkspaceService } from '@/services/workspace/workspace'

export const workspacesQueryKey = ['workspaces'] as const

export function useWorkspacesQuery(page = 1, limit = 20) {
  return useQuery({
    queryKey: [...workspacesQueryKey, page, limit],
    queryFn: () => WorkspaceService.GetWorkspace(page, limit),
  })
}

export function useWorkspaceIdQuery(workspaceId: string) {
  return useQuery({
    queryKey: [...workspacesQueryKey, workspaceId],
    queryFn: () => WorkspaceService.GetWorkspaceById(workspaceId),
  })
}
