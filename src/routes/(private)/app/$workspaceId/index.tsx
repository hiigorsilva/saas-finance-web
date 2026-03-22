import { createFileRoute } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Container } from '@/components/layout/container'
import { TitleIconPage } from '@/components/layout/title-icon-page'
import { TitlePage } from '@/components/layout/title-page'
import { DASHBOARD_KEYS } from '@/data/keys/local-storage'
import type { ExpenseByCategoryType } from '@/data/requests/expense-by-category'
import {
  type TransactionType,
  transactionResponse,
} from '@/data/requests/transactions'
import { monthSelectSchema } from '@/schemas/dashboard-select-time'
import { DashBoardCardBalance } from './-components/dashboard-card-balance'
import { DashBoardCardChart } from './-components/dashboard-card-chat'
import { DashBoardCardExpense } from './-components/dashboard-card-expense'
import { DashboardCardExpenseByCategory } from './-components/dashboard-card-expense-by-category'
import { DashBoardCardIncome } from './-components/dashboard-card-income'
import { DashBoardCardInvestiment } from './-components/dashboard-card-investiment'
import { DashBoardCardLastTransactions } from './-components/dashboard-card-last-transactions'
import { DashboardCardLatePayment } from './-components/dashboard-card-late-payment'
import { DashboardCardWeekPayment } from './-components/dashboard-card-week-payment'
import { DashboardTimeSelect } from './-components/dashboard-time-select'

export const Route = createFileRoute('/(private)/app/$workspaceId/')({
  component: DashboardPage,
  validateSearch: monthSelectSchema,
  head: () => ({
    meta: [
      {
        title: 'Dashboard | Luna',
      },
    ],
  }),
})

function DashboardPage() {
  const router = Route.useNavigate()
  const match = Route.useMatch()

  const initialShowAmount = (): boolean => {
    const storedShowAmount = localStorage.getItem(DASHBOARD_KEYS.showAmount)
    if (!storedShowAmount) return false
    return JSON.parse(storedShowAmount) ?? false
  }
  const [showAmount, setShowAmount] = useState(initialShowAmount)

  const { data: transactions } = transactionResponse.body
  // const transactions = [] as TransactionType[]
  const latePayments = [] as TransactionType[]
  const weekPayments = [] as TransactionType[]
  const expenseByCategory = [
    {
      name: 'Alimentação',
      expense: '500.00',
      totalExpense: '2000.00',
      progress: 25,
    },
  ] as ExpenseByCategoryType[]

  async function fetchData() {}

  const handleNavigateBack = () => {
    router({
      to: '/app',
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Container className="gap-6 py-6">
      {/* HEADER */}
      <div className="flex justify-between items-center gap-6">
        {/* TITLE */}
        <div className="flex items-center gap-2">
          <TitleIconPage handleNavigateBack={handleNavigateBack}>
            <ChevronLeftIcon />
          </TitleIconPage>
          <TitlePage>Dashboard</TitlePage>
        </div>

        {/* DATE FILTER */}
        <div className="flex items-center gap-4">
          <DashboardTimeSelect search={match.search} />
        </div>
      </div>

      <div className="w-full flex-auto grid grid-cols-3 gap-3">
        {/* LEFTSIDE */}
        <div className="flex flex-col gap-6 col-span-2 col-start-1">
          {/* CARDS */}
          <div className="flex flex-col gap-3">
            <DashBoardCardBalance
              showAmountSwitch={setShowAmount}
              showAmount={showAmount}
              onFetchData={fetchData}
            />

            <div className="grid grid-cols-3 gap-3">
              <DashBoardCardIncome showAmount={showAmount} />
              <DashBoardCardExpense showAmount={showAmount} />
              <DashBoardCardInvestiment showAmount={showAmount} />
            </div>
          </div>

          <DashBoardCardChart />
          <DashBoardCardLastTransactions transactions={transactions} />
        </div>

        {/* RIGHTSIDE */}
        <div className="flex flex-col justify-between gap-3 col-span-1 col-start-3">
          <DashboardCardLatePayment latePayments={latePayments} />
          <DashboardCardWeekPayment weekPayments={weekPayments} />
          <DashboardCardExpenseByCategory
            expenseByCategory={expenseByCategory}
          />
        </div>
      </div>
    </Container>
  )
}
