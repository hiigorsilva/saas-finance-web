import { api } from '../api/client'
import type { ApiResponse } from '../api/types'
import type { IInviteToWorkspace } from './notification.d'

export class NotificationService {
  static async GetInvitesToWorkspace() {
    const response =
      await api.get<ApiResponse<IInviteToWorkspace[]>>('/workspace/invite')
    return response.data.data
  }
}
