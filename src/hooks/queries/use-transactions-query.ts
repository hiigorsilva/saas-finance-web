import { useQuery } from '@tanstack/react-query'
import { TransactionService } from '@/services/transaction/transaction'

export const transactionsQueryKey = ['transactions'] as const

export function useTransactionsQuery(
  workspaceId: string,
  page = 1,
  limit = 50
) {
  const safePage = Number.isFinite(page) && page > 0 ? page : 1
  const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 50

  return useQuery({
    queryKey: [...transactionsQueryKey, workspaceId, safePage, safeLimit],
    queryFn: () =>
      TransactionService.GetTransactions(workspaceId, safePage, safeLimit),
    enabled: !!workspaceId,
  })
}
