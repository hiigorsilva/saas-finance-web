import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { percentFormat } from '@/utils/percent-format'
import { DashboardCardChartItem } from './dashboard-card-chart-item'
import { DashboardCardIcon } from './dashboard-card-icon'

export function DashBoardCardChart() {
  return (
    <Card>
      <CardHeader className="gap-6">
        <CardTitle className="text-center">
          Distribuição mensal da renda
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex justify-center items-center gap-6">
        {/* CAPTIONS */}
        <div className="flex flex-col gap-4">
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
              {percentFormat(66.38)}
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
              {percentFormat(21.55)}
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
              {percentFormat(12.07)}
            </strong>
          </div>
        </div>

        {/* CHART */}
        <DashboardCardChartItem />
      </CardContent>
    </Card>
  )
}
