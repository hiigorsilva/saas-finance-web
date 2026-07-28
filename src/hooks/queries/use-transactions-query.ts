import { useQuery } from '@tanstack/react-query'
import {
  type TransactionListFilters,
  TransactionService,
} from '@/services/transaction/transaction'

export const transactionsQueryKey = ['transactions'] as const

export function useTransactionsQuery(
  workspaceId: string,
  page = 1,
  limit = 50,
  filters: TransactionListFilters = {}
) {
  const safePage = Number.isFinite(page) && page > 0 ? page : 1
  const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 50

  return useQuery({
    queryKey: [
      ...transactionsQueryKey,
      workspaceId,
      safePage,
      safeLimit,
      filters,
    ],
    queryFn: () =>
      TransactionService.GetTransactions(
        workspaceId,
        safePage,
        safeLimit,
        filters
      ),
    enabled: !!workspaceId,
    staleTime: 1000 * 50, // 50 segundos
  })
}
