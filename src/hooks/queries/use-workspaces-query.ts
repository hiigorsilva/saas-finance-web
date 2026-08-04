import { useQuery } from '@tanstack/react-query'
import { WorkspaceService } from '@/services/workspace/workspace'

export const workspacesQueryKey = ['workspaces'] as const

export function useWorkspacesQuery(
  page = 1,
  limit = 50,
  searchWorkspace?: string
) {
  const parsedSearchWorkspace = searchWorkspace?.trim() || undefined

  return useQuery({
    queryKey: [...workspacesQueryKey, page, limit, parsedSearchWorkspace],
    queryFn: () =>
      WorkspaceService.GetWorkspace(page, limit, parsedSearchWorkspace),
    placeholderData: previousData => previousData,
  })
}

export function useWorkspaceIdQuery(workspaceId: string) {
  return useQuery({
    queryKey: [...workspacesQueryKey, workspaceId],
    queryFn: () => WorkspaceService.GetWorkspaceById(workspaceId),
  })
}

export function useMembersOfWorkspaceQuery(
  workspaceId: string,
  page = 1,
  limit = 50
) {
  return useQuery({
    queryKey: [...workspacesQueryKey, workspaceId, page, limit],
    queryFn: () =>
      WorkspaceService.ListMemberOfWorkspace(workspaceId, page, limit),
  })
}

export function useGetMemberByIdOfWorkspaceQuery(
  workspaceId: string,
  memberId: string
) {
  return useQuery({
    queryKey: [...workspacesQueryKey, 'memberById', workspaceId, memberId],
    queryFn: () =>
      WorkspaceService.GetMemberByIdOfWorkspace(workspaceId, memberId),
    enabled: !!workspaceId && !!memberId,
  })
}
