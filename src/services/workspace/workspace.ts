import type { ApiPaginatedResponse, ApiResponse } from '@/services/api/types'
import { api } from '../api/client'
import type { IWorkspace } from './workspace.d'

export class WorkspaceService {
  static async GetWorkspace(page: number, limit: number) {
    const response = await api.get<ApiPaginatedResponse<IWorkspace>>(
      '/workspace',
      {
        params: {
          page,
          limit,
        },
      }
    )

    return response.data
  }

  static async PostWorkspace(data: Omit<IWorkspace, 'id'>) {
    const response = await api.post<ApiResponse<IWorkspace>>('/workspace', data)

    return response.data.data
  }
}
