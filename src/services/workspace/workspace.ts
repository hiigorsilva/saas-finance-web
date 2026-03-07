import type { IHttpResponse, IPaginateResponse } from '@/utils/http'
import { api } from '../api/api'
import type { IWorkspace } from './workspace.d'

export class WorkspaceService {
  static async GetWorkspace(page: number, limit: number) {
    const res = await api.get<IHttpResponse<IPaginateResponse<IWorkspace>>>(
      '/workspace',
      {
        params: {
          page,
          limit,
        },
      }
    )
    return res
  }

  static async PostWorkspace(data: IWorkspace) {
    const res = await api.post<IHttpResponse<{ data: IWorkspace }>>(
      '/workspace',
      data
    )
    return res
  }
}
