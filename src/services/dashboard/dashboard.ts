import type { ApiResponse } from '@/services/api/types'
import { api } from '../api/client'
import type { IDashboard } from './dashboard.d'

function hasNestedDashboardData(
  payload: unknown
): payload is { data: IDashboard } {
  if (!payload || typeof payload !== 'object') return false
  if (!('data' in payload)) return false

  const nested = payload.data
  if (!nested || typeof nested !== 'object') return false

  return 'resume' in nested && 'metrics' in nested
}

export class DashboardService {
  static async GetDashboard(workspaceId: string, month: string, year: string) {
    const response = await api.get<ApiResponse<IDashboard>>(`/${workspaceId}`, {
      params: { month, year },
    })

    const payload = response.data.data

    return hasNestedDashboardData(payload) ? payload.data : payload
  }
}
