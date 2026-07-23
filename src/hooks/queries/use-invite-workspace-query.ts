import { useQuery } from '@tanstack/react-query'
import { NotificationService } from '@/services/notifications/notification'

export const inviteToWorkspaceQueryKey = ['invite-to-workspace'] as const

export function useInviteToWorkspaceQuery() {
  return useQuery({
    queryKey: inviteToWorkspaceQueryKey,
    queryFn: () => NotificationService.GetInvitesToWorkspace(),
  })
}
