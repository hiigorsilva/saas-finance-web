import { useQuery } from '@tanstack/react-query'
import { TransactionService } from '@/services/transaction/transaction'

export const transactionsQueryKey = ['transactions'] as const

export function useTransactionsQuery(
  workspaceId: string,
  page = 1,
  limit = 50
) {
  return useQuery({
    queryKey: [...transactionsQueryKey, workspaceId, page, limit],
    queryFn: () => TransactionService.GetTransactions(workspaceId, page, limit),
    enabled: !!workspaceId,
  })
}
