import { format } from 'date-fns'
import type { AddTransactionType } from '@/schemas/add-transaction-button'
import type { EditTransactionType } from '@/schemas/edit-transaction-button'
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
    console.log('payload', payloadData)
    const payload = {
      ...payloadData,
      paymentDate: format(payloadData.paymentDate, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
    }

    const res = await api.post<IHttpResponse<ITransaction>>(
      `/${workspaceId}/transaction`,
      payload
    )
    return res
  }

  static async PutTransaction(
    workspaceId: string,
    transactionId: string,
    data: EditTransactionType
  ) {
    const { workspaceId: _workspaceId, ...payloadData } = data
    console.log('payload', payloadData)
    const payload = {
      ...payloadData,
      paymentDate: format(payloadData.paymentDate, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
    }

    const res = await api.put<IHttpResponse<ITransaction>>(
      `/${workspaceId}/transaction/${transactionId}`,
      payload
    )
    return res
  }

  static async DeleteTransaction(workspaceId: string, transactionId: string) {
    const res = await api.delete<IHttpResponse<ITransaction>>(
      `/${workspaceId}/transaction/${transactionId}`
    )
    return res
  }
}
