import { useMutation, useQueryClient } from '@tanstack/react-query'
import { dashboardQueryKey } from '@/hooks/queries/use-dashboard-query'
import { transactionsQueryKey } from '@/hooks/queries/use-transactions-query'
import { TransactionService } from '@/services/transaction/transaction'

type DeleteTransactionPayload = {
  workspaceId: string
  transactionId: string
}

export function useDeleteTransactionMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ workspaceId, transactionId }: DeleteTransactionPayload) =>
      TransactionService.DeleteTransaction(workspaceId, transactionId),
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
