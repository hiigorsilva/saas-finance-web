import { format } from 'date-fns'
import type { AddTransactionType } from '@/schemas/add-transaction-button'
import type { EditTransactionType } from '@/schemas/edit-transaction-button'
import type { ApiPaginatedResponse, ApiResponse } from '@/services/api/types'
import { api } from '../api/client'
import type { ITransaction } from './transaction.d'

export class TransactionService {
  static async GetTransactions(
    workspaceId: string,
    page: number,
    limit: number
  ) {
    const response = await api.get<ApiPaginatedResponse<ITransaction>>(
      `/${workspaceId}/transaction`,
      {
        params: { page, limit },
      }
    )

    return response.data
  }

  static async PostTransaction(workspaceId: string, data: AddTransactionType) {
    const payload = {
      ...data,
      amount: Number(data.amount.toFixed(2)),
      paymentDate: format(data.paymentDate, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
    }

    const response = await api.post<ApiResponse<ITransaction>>(
      `/${workspaceId}/transaction`,
      payload
    )

    return response.data.data
  }

  static async PutTransaction(
    workspaceId: string,
    transactionId: string,
    data: EditTransactionType
  ) {
    const payload = {
      ...data,
      amount: Number(data.amount.toFixed(2)),
      paymentDate: format(data.paymentDate, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
    }

    const response = await api.put<ApiResponse<ITransaction>>(
      `/${workspaceId}/transaction/${transactionId}`,
      payload
    )

    return response.data.data
  }

  static async DeleteTransaction(workspaceId: string, transactionId: string) {
    const response = await api.delete<ApiResponse<ITransaction>>(
      `/${workspaceId}/transaction/${transactionId}`
    )

    return response.data.data
  }
}
