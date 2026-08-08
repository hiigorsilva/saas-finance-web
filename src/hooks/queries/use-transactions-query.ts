import { useQuery } from '@tanstack/react-query'
import {
  type TransactionListFilters,
  TransactionService,
} from '@/services/transaction/transaction'
import { validateSearchTerm } from '@/utils/search'

export const transactionsQueryKey = ['transactions'] as const

export function useTransactionsQuery(
  workspaceId: string,
  page = 1,
  limit = 50,
  filters: TransactionListFilters = {}
) {
  const safePage = Number.isFinite(page) && page > 0 ? page : 1
  const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 50
  const filtersFormatted = {
    ...filters,
    search: validateSearchTerm(filters.search),
  }

  return useQuery({
    queryKey: [
      ...transactionsQueryKey,
      workspaceId,
      safePage,
      safeLimit,
      filtersFormatted,
    ],
    queryFn: () =>
      TransactionService.GetTransactions(
        workspaceId,
        safePage,
        safeLimit,
        filtersFormatted
      ),
    enabled: !!workspaceId,
    placeholderData: previousData => previousData,
    staleTime: 1000 * 50, // 50 segundos
  })
}
