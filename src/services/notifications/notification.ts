import { api } from '../api/client'
import type { ApiResponse } from '../api/types'
import type { IInviteToWorkspace } from './notification.d'

export class NotificationService {
  static async GetInvitesToWorkspace() {
    const response =
      await api.get<ApiResponse<IInviteToWorkspace[]>>('/workspace/invite')
    return response.data.data
  }

  static async AcceptInviteWorkspace(inviteId: string) {
    const response = await api.post<ApiResponse<{ status: string }>>(
      `/workspace/invite/${inviteId}/accept`
    )
    return response.data.data
  }

  static async DeclineInviteWorkspace(inviteId: string) {
    const response = await api.post<ApiResponse<{ status: string }>>(
      `/workspace/invite/${inviteId}/decline`
    )
    return response.data.data
  }
}
