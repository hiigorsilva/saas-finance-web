import { createFileRoute } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Container } from '@/components/layout/container'
import { Loading } from '@/components/layout/loading'
import { TitleIconPage } from '@/components/layout/title-icon-page'
import { TitlePage } from '@/components/layout/title-page'
import { DASHBOARD_KEYS } from '@/data/keys/local-storage'
import { useDashboardQuery } from '@/hooks/queries/use-dashboard-query'
import { monthSelectSchema } from '@/schemas/dashboard-select-time'
import { normalizeApiError } from '@/services/api/errors'
import { DashBoardCardBalance } from './-components/dashboard-card-balance'
import { DashBoardCardChart } from './-components/dashboard-card-chat'
import { DashBoardCardExpense } from './-components/dashboard-card-expense'
import { DashboardCardExpenseByCategory } from './-components/dashboard-card-expense-by-category'
import { DashBoardCardIncome } from './-components/dashboard-card-income'
import { DashBoardCardInvestiment } from './-components/dashboard-card-investiment'
import { DashBoardCardLastTransactions } from './-components/dashboard-card-last-transactions'
import { DashboardCardMetricsRatios } from './-components/dashboard-card-metrics-ratios'
import { DashboardCardMetricsTrend } from './-components/dashboard-card-metrics-trend'
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

  function formattedSearchValue(value?: string) {
    if (!value) return ''
    const clearedValue = value.replace(/^"+|"+$/g, '').trim()
    return clearedValue
  }

  const month = formattedSearchValue(match.search.month)
  const year = formattedSearchValue(match.search.year)

  const {
    data: dashboard,
    isPending,
    error,
    isError,
  } = useDashboardQuery(match.params.workspaceId, month, year)

  useEffect(() => {
    if (!error) return

    const apiError = normalizeApiError(error)
    toast.error(apiError.message)
  }, [error])

  const handleNavigateBack = () => {
    router({
      to: '/app',
    })
  }

  if (isPending) return <Loading />
  if (isError || !dashboard) {
    return (
      <Container className="gap-6 py-6">
        <div className="flex justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <TitleIconPage handleNavigateBack={handleNavigateBack}>
              <ChevronLeftIcon />
            </TitleIconPage>
            <TitlePage>Dashboard</TitlePage>
          </div>
        </div>

        <div className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
          Não foi possível carregar os dados do dashboard para este período.
        </div>
      </Container>
    )
  }

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
              balanceValue={dashboard.resume.totalBalance ?? 0}
              balancePercent={dashboard.resume.totalBalancePercent ?? 0}
            />

            <div className="grid grid-cols-3 gap-3">
              <DashBoardCardIncome
                showAmount={showAmount}
                incomeValue={dashboard.resume.totalIncome ?? 0}
                incomePercent={dashboard.resume.totalIncomePercent ?? 0}
              />
              <DashBoardCardExpense
                showAmount={showAmount}
                expenseValue={dashboard.resume.totalExpense ?? 0}
                expensePercent={dashboard.resume.totalExpensePercent ?? 0}
              />
              <DashBoardCardInvestiment
                showAmount={showAmount}
                investimentValue={dashboard.resume.totalInvestment ?? 0}
                investimentPercent={
                  dashboard.resume.totalInvestmentPercent ?? 0
                }
              />
            </div>
          </div>

          <DashBoardCardChart
            monthlyDistribution={dashboard.monthlyDistribution}
            search={match.search}
          />
          <DashBoardCardLastTransactions
            transactions={dashboard.lastTransactions ?? []}
          />
        </div>

        {/* RIGHTSIDE */}
        <div className="flex flex-col justify-between gap-3 col-span-1 col-start-3">
          <DashboardCardMetricsRatios metrics={dashboard.metrics} />
          <DashboardCardMetricsTrend metrics={dashboard.metrics} />
          <DashboardCardExpenseByCategory
            expenseByCategory={dashboard.expenseByCategory ?? []}
          />
        </div>
      </div>
    </Container>
  )
}
