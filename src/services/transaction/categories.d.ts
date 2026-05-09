import type { TransactionCategoryValuesType } from '@/data/labels/transaction-category'

export type ICategory = {
  name: TransactionCategoryValuesType
  expense: string
  totalExpense: string
  progress: number
}
