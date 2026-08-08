import { format } from 'date-fns'
import type { TransactionCategoryValuesType } from '@/data/labels/transaction-category'
import type { TransactionPaymentMethodValuesType } from '@/data/labels/transaction-payment-method'
import type { TransactionTypeValuesType } from '@/data/labels/transaction-type'
import type { AddTransactionType } from '@/schemas/add-transaction-button'
import type { EditTransactionType } from '@/schemas/edit-transaction-button'
import type { ApiPaginatedResponse, ApiResponse } from '@/services/api/types'
import { api } from '../api/client'
import type { ITransaction } from './transaction.d'

export type TransactionListFilters = {
  search?: string
  type?: TransactionTypeValuesType
  category?: TransactionCategoryValuesType
  paymentMethod?: TransactionPaymentMethodValuesType
  startDate?: string
  endDate?: string
}

export class TransactionService {
  private static formatTransactionData(
    data: AddTransactionType | EditTransactionType
  ) {
    const payload = {
      ...data,
      amount: data.amount.toFixed(2),
      paymentDate: format(data.paymentDate, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
    }
    return payload
  }
  static async GetTransactions(
    workspaceId: string,
    page: number,
    limit: number,
    filters: TransactionListFilters = {}
  ) {
    const params = {
      page,
      limit,
      ...filters,
    }

    const response = await api.get<ApiPaginatedResponse<ITransaction>>(
      `/${workspaceId}/transaction`,
      {
        params,
      }
    )

    return response.data
  }

  static async PostTransaction(workspaceId: string, data: AddTransactionType) {
    const payload = this.formatTransactionData(data)

    const response = await api.post<ApiResponse<ITransaction>>(
      `/${workspaceId}/transaction`,
      payload
    )

    return response.data
  }

  static async PutTransaction(
    workspaceId: string,
    transactionId: string,
    data: EditTransactionType
  ) {
    const payload = this.formatTransactionData(data)

    const response = await api.put<ApiResponse<ITransaction>>(
      `/${workspaceId}/transaction/${transactionId}`,
      payload
    )

    return response.data
  }

  static async DeleteTransaction(workspaceId: string, transactionId: string) {
    const response = await api.delete<ApiResponse<ITransaction>>(
      `/${workspaceId}/transaction/${transactionId}`
    )

    return response.data
  }
}
