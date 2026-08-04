import { useMutation, useQueryClient } from '@tanstack/react-query'
import { dashboardQueryKey } from '@/hooks/queries/use-dashboard-query'
import { transactionsQueryKey } from '@/hooks/queries/use-transactions-query'
import type { EditTransactionType } from '@/schemas/edit-transaction-button'
import { TransactionService } from '@/services/transaction/transaction'

type UpdateTransactionPayload = {
  workspaceId: string
  transactionId: string
  data: EditTransactionType
}

export function useUpdateTransactionMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      workspaceId,
      transactionId,
      data,
    }: UpdateTransactionPayload) =>
      TransactionService.PutTransaction(workspaceId, transactionId, data),
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
