export interface ITransaction {
  id: string
  workspaceId: string
  createdByUserId: string
  name: string
  description: string
  type: TransactionTypeValuesType
  category: TransactionCategoryValuesType
  amount: string
  paymentDate: string
  paymentMethod: TransactionPaymentMethodValuesType
  isRecurring: boolean
  recurringInterval: null
  recurringEndDate: null
  installmentTotal: null
  currentInstallment: null
  createdAt: string
  updatedAt: string
}
