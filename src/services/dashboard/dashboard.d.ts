import type { ICategory } from '../transaction/categories'
import type { ITransaction } from '../transaction/transaction.d'

export interface IDashboard {
  data: {
    resume: Resume
    metrics: Metrics
    monthlyDistribution: MonthlyDistribution
    lastTransactions: ITransaction[]
    expenseByCategory: ICategory[]
  }
}

export interface Resume {
  totalIncome: number
  totalIncomePercent: number
  totalExpense: number
  totalExpensePercent: number
  totalBalance: number
  totalBalancePercent: number
  totalInvestment: number
  totalInvestmentPercent: number
}

export interface Metrics {
  savingsRate: number
  burnRate: number
  projectedBalance: number
  expenseRatio: number
  expenseChange: number
  incomeChange: number
}

export interface MonthlyDistribution {
  income: number
  expense: number
  investment: number
}
