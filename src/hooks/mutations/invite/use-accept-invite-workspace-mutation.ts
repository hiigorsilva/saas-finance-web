import { useMutation, useQueryClient } from '@tanstack/react-query'
import { inviteToWorkspaceQueryKey } from '@/hooks/queries/use-invite-workspace-query'
import { workspacesQueryKey } from '@/hooks/queries/use-workspaces-query'
import { NotificationService } from '@/services/notifications/notification'

export function useAcceptInviteWorkspaceMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (inviteId: string) =>
      NotificationService.AcceptInviteWorkspace(inviteId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...inviteToWorkspaceQueryKey],
      })
      queryClient.invalidateQueries({ queryKey: [...workspacesQueryKey] })
    },
  })
}

export function useDeclineInviteWorkspaceMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (inviteId: string) =>
      NotificationService.DeclineInviteWorkspace(inviteId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...inviteToWorkspaceQueryKey],
      })
      queryClient.invalidateQueries({ queryKey: [...workspacesQueryKey] })
    },
  })
}
