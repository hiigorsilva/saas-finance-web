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
  createdAt: string
  updatedAt: string
}
