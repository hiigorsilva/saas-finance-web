import type { ICategory } from '../transaction/categories'
import type { ITransaction } from '../transaction/transaction.d'

export type IDashboard = {
  resume: {
    totalIncome: number
    totalIncomePercent: number
    totalExpense: number
    totalExpensePercent: number
    totalBalance: number
    totalBalancePercent: number
    totalInvestment: number
    totalInvestmentPercent: number
  }
  monthlyDistribution: {
    income: number
    expense: number
    investment: number
  }
  lastTransactions: ITransaction[]
  expenseByCategory: ICategory[]
  weeklyPayment: ITransaction[]
  latePayments: ITransaction[]
}
