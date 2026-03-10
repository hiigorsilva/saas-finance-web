import type { AddTransactionType } from '@/schemas/add-transaction-button'
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

  static async PostTransaction(workspaceId: string, data: AddTransactionType) {
    const { workspaceId: _workspaceId, ...payloadData } = data

    const payload = payloadData.isRecurring
      ? payloadData
      : {
          ...payloadData,
          amount: payloadData.amount.split(' ')[1].replace(',', '.'),
          isRecurring: false,
          recurringInterval: undefined,
          recurringEndDate: undefined,
          installmentTotal: undefined,
          currentInstallment: undefined,
        }

    const res = await api.post<IHttpResponse<ITransaction>>(
      `/${workspaceId}/transaction`,
      payload
    )
    return res
  }
}
