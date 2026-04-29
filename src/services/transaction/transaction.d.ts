export interface ITransaction {
  id: string
  workspaceId: string
  createdByUserId: string
  name: string
  description: string
  type: TransactionTypeValuesType
  category: TransactionCategoryValuesType
  amount: number
  paymentDate: string
  paymentMethod: TransactionPaymentMethodValuesType
  createdAt: string
  updatedAt: string
}
