import type { IHttpResponse } from '@/utils/http'
import { api } from '../api/api'
import type { IDashboard } from './dashboard.d'

export class DashboardService {
  static async GetDashboard(workspaceId: string, month: string, year: string) {
    const res = await api.get<IHttpResponse<{ data: IDashboard }>>(
      `/${workspaceId}`,
      {
        params: { month, year },
      }
    )
    return res
  }
}
