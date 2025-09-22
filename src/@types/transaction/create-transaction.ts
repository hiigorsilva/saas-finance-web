import type { TransactionCategoryValuesType } from '@/data/labels/transaction-category'
import type { TransactionPaymentMethodValuesType } from '@/data/labels/transaction-payment-method'
import type { TransactionRecurringIntervalValuesType } from '@/data/labels/transaction-recurring-interval'
import type { TransactionTypeValuesType } from '@/data/labels/transaction-type'

export type CreateTransactionType = {
  workspaceId: string
  name: string
  type: TransactionTypeValuesType
  category: TransactionCategoryValuesType
  amount: string
  paymentDate: Date
  paymentMethod: TransactionPaymentMethodValuesType
  isRecurring: boolean
  recurringInterval: TransactionRecurringIntervalValuesType | null
  recurringEndDate: Date | null
  installmentTotal: number | null
  currentInstallment: number | null
  description?: string | undefined
}
