import type { ApiPaginatedResponse, ApiResponse } from '@/services/api/types'
import { api } from '../api/client'
import type {
  AddMemberToWorkspacePayload,
  IMembersOfWorkspace,
  IWorkspace,
  IWorkspaceDetails,
  UpdateMemberToWorkspacePayload,
} from './workspace.d'

export class WorkspaceService {
  static async GetWorkspace(
    page: number,
    limit: number,
    searchWorkspace?: string
  ) {
    const response = await api.get<ApiPaginatedResponse<IWorkspace>>(
      '/workspace',
      {
        params: {
          page,
          limit,
          searchWorkspace,
        },
      }
    )
    return response.data
  }

  static async GetWorkspaceById(workspaceId: string) {
    const response = await api.get<ApiResponse<IWorkspaceDetails>>(
      `/workspace/${workspaceId}`
    )
    return response.data.data
  }

  static async PostWorkspace(
    data: Pick<IWorkspace, 'name' | 'description' | 'type'>
  ) {
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

  // MEMBERS OF WORKSPACE

  static async AddMemberToWorkspace(data: AddMemberToWorkspacePayload) {
    const { workspaceId, ...payload } = data
    const response = await api.post<ApiResponse<{ id: string }>>(
      `/workspace/${workspaceId}/member`,
      payload
    )
    return response.data.data
  }

  static async GetMemberByIdOfWorkspace(workspaceId: string, memberId: string) {
    const response = await api.get<ApiResponse<IMembersOfWorkspace>>(
      `/workspace/${workspaceId}/member/${memberId}`
    )
    return response.data.data
  }

  static async UpdateMemberOfWorkspace(data: UpdateMemberToWorkspacePayload) {
    const { memberId, workspaceId, ...payload } = data
    const response = await api.put<{ data: string }>(
      `/workspace/${workspaceId}/member/${memberId}`,
      { newRole: payload.role }
    )
    return response.data.data
  }

  static async RemoveMemberOfWorkspace(workspaceId: string, memberId: string) {
    const response = await api.delete<{ data: string }>(
      `/workspace/${workspaceId}/member/${memberId}`
    )
    return response.data.data
  }

  static async ListMemberOfWorkspace(
    workspaceId: string,
    page: number,
    limit: number
  ) {
    const response = await api.get<ApiPaginatedResponse<IMembersOfWorkspace>>(
      `/workspace/${workspaceId}/member`,
      {
        params: {
          page,
          limit,
        },
      }
    )
    return response.data.data
  }
}
