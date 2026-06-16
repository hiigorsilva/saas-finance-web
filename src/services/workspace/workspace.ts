import type { ApiPaginatedResponse, ApiResponse } from '@/services/api/types'
import { api } from '../api/client'
import type {
  AddMemberToWorkspacePayload,
  IWorkspace,
  IWorkspaceMember,
} from './workspace.d'

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

  static async GetWorkspaceById(workspaceId: string) {
    const response = await api.get<ApiResponse<IWorkspace>>(
      `/workspace/${workspaceId}`
    )
    return response.data.data
  }

  static async PostWorkspace(data: Omit<IWorkspace, 'id'>) {
    const response = await api.post<ApiResponse<IWorkspace>>('/workspace', data)
    return response.data.data
  }

  static async PutWorkspace(
    workspaceId: string,
    data: Partial<Omit<IWorkspace, 'id'>>
  ) {
    const response = await api.put<ApiResponse<IWorkspace>>(
      `/workspace/${workspaceId}`,
      data
    )
    return response.data.data
  }

  static async DeleteWorkspace(workspaceId: string) {
    const response = await api.delete<ApiResponse<IWorkspace>>(
      `/workspace/${workspaceId}`
    )
    return response.data.data
  }

  static async AddMemberToWorkspace(data: AddMemberToWorkspacePayload) {
    const { workspaceId, ...payload } = data
    const response = await api.post<ApiResponse<IWorkspaceMember>>(
      `/workspace/${workspaceId}/member`,
      payload
    )
    return response.data.data
  }
}
