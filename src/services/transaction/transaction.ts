import type { IHttpResponse, IPaginateResponse } from '@/utils/http'
import { api } from '../api/api'
import type { ITransaction } from './transaction.d'

export class TransactionService {
  static async GetTransactions(
    workspaceId: string,
    page: number,
    limit: number
  ) {
    const res = await api.get<IHttpResponse<IPaginateResponse<ITransaction>>>(
      `/${workspaceId}/transaction`,
      {
        params: { page, limit },
      }
    )
    return res
  }
}
