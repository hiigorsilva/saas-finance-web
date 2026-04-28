import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { MONTHS_OF_YEAR } from '@/data/date/month-select'
import { percentFormat } from '@/utils/percent-format'
import { DashboardCardChartItem } from './dashboard-card-chart-item'
import { DashboardCardIcon } from './dashboard-card-icon'

type MonthlyDistributionType = {
  income: number
  expense: number
  investment: number
}

type DashBoardCardChartProps = {
  monthlyDistribution: MonthlyDistributionType
  search: {
    month?: string
    year?: string
  }
}

export function DashBoardCardChart({
  monthlyDistribution,
  search,
}: DashBoardCardChartProps) {
  const monthAndYear = () => {
    const monthIndex = Number(search.month) - 1
    const monthName = MONTHS_OF_YEAR[monthIndex] || 'Mês desconhecido'
    const year = search.year || 'Ano desconhecido'
    return { month: monthName.label, year }
  }

  return (
    <Card>
      <CardHeader className="gap-6">
        <CardTitle className="text-center">
          Distribuição Mensal - {monthAndYear().month} de {monthAndYear().year}
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex justify-center items-center gap-6">
        {/* CAPTIONS */}
        <div className="max-w-3xs w-full flex flex-col gap-4">
          {/* INCOME */}
          <div className="flex justify-between items-center gap-2">
            <DashboardCardIcon className="bg-green-500/10 border border-green-500/25">
              <TrendingUpIcon
                className="size-4 shrink-0 text-green-500"
                strokeWidth={2}
              />
            </DashboardCardIcon>

            <h3 className="w-full font-semibold text-green-500">Receitas</h3>

            <strong className="inline-block font-semibold text-green-500">
              {percentFormat(monthlyDistribution.income)}
            </strong>
          </div>

          {/* EXPENSE */}
          <div className="flex justify-between items-center gap-2">
            <DashboardCardIcon className="bg-red-500/10 border border-red-500/25">
              <TrendingDownIcon
                className="size-4 shrink-0 text-red-500"
                strokeWidth={2}
              />
            </DashboardCardIcon>

            <h3 className="w-full font-semibold text-red-500">Despesas</h3>

            <strong className="inline-block font-semibold text-red-500">
              {percentFormat(monthlyDistribution.expense)}
            </strong>
          </div>

          {/* INVESTIMENT */}
          <div className="flex justify-between items-center gap-2">
            <DashboardCardIcon className="bg-blue-500/10 border border-blue-500/25">
              <PiggyBankIcon
                className="size-4 shrink-0 text-blue-500"
                strokeWidth={2}
              />
            </DashboardCardIcon>

            <h3 className="w-full font-semibold text-blue-500">
              Investimentos
            </h3>

            <strong className="inline-block font-semibold text-blue-500">
              {percentFormat(monthlyDistribution.investment)}
            </strong>
          </div>
        </div>

        {/* CHART */}
        {monthlyDistribution.income === 0 &&
        monthlyDistribution.expense === 0 &&
        monthlyDistribution.investment === 0 ? null : (
          <DashboardCardChartItem monthlyDistribution={monthlyDistribution} />
        )}
      </CardContent>
    </Card>
  )
}
