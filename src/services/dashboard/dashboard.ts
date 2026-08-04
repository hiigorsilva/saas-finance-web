import type { ApiResponse } from '@/services/api/types'
import { api } from '../api/client'
import type { IDashboard } from './dashboard.d'

export class DashboardService {
  static async GetDashboard(workspaceId: string, month: string, year: string) {
    const response = await api.get<ApiResponse<IDashboard>>(`/${workspaceId}`, {
      params: { month, year },
    })

    return response.data.data
  }
}
