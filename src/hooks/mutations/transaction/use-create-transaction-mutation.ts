import { useMutation, useQueryClient } from '@tanstack/react-query'
import { dashboardQueryKey } from '@/hooks/queries/use-dashboard-query'
import { transactionsQueryKey } from '@/hooks/queries/use-transactions-query'
import type { AddTransactionType } from '@/schemas/add-transaction-button'
import { TransactionService } from '@/services/transaction/transaction'

type CreateTransactionPayload = {
  workspaceId: string
  data: AddTransactionType
}

export function useCreateTransactionMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ workspaceId, data }: CreateTransactionPayload) =>
      TransactionService.PostTransaction(workspaceId, data),
    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...transactionsQueryKey, variables.workspaceId],
      })
      queryClient.invalidateQueries({
        queryKey: [...dashboardQueryKey, variables.workspaceId],
      })
    },
  })
}
