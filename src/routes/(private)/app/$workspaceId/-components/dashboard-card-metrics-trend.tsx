import { ArrowDownIcon, ArrowUpIcon, LandmarkIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import type { Metrics } from '@/services/dashboard/dashboard.d'
import { currencyFormat } from '@/utils/currency-format'
import { percentFormat } from '@/utils/percent-format'

type DashboardCardMetricsTrendProps = {
  metrics: Metrics
}

type MetricChangeItemProps = {
  label: string
  value: number
}

function MetricChangeItem({ label, value }: MetricChangeItemProps) {
  const isPositive = value >= 0

  return (
    <div className="flex justify-between items-center gap-3">
      <span className="font-medium text-sm text-muted-foreground leading-none">
        {label}
      </span>

      <div
        className={cn(
          'w-fit h-fit flex justify-center items-center gap-1 text-xs rounded-full pl-1.5 pr-2 py-0.5 border',
          isPositive
            ? 'text-green-500 bg-green-500/10 border-green-500/25'
            : 'text-red-500 bg-red-500/10 border-red-500/25'
        )}
      >
        {isPositive ? (
          <ArrowUpIcon className="size-3 shrink-0 text-green-500" />
        ) : (
          <ArrowDownIcon className="size-3 shrink-0 text-red-500" />
        )}
        {percentFormat(value, 1)}
      </div>
    </div>
  )
}

export function DashboardCardMetricsTrend({
  metrics,
}: DashboardCardMetricsTrendProps) {
  return (
    <Card className="flex flex-col flex-auto">
      <CardHeader className="gap-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-center">Tendência mensal</CardTitle>
        </div>
        <Separator />
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <LandmarkIcon className="size-4 shrink-0 text-primary" />
            <span className="font-medium text-sm text-foreground leading-none">
              Saldo projetado
            </span>
          </div>

          <strong className="font-semibold text-sm text-foreground leading-none">
            {currencyFormat(metrics.projectedBalance)}
          </strong>
        </div>

        <MetricChangeItem
          label="Variação da receita"
          value={metrics.incomeChange}
        />
        <MetricChangeItem
          label="Variação da despesa"
          value={metrics.expenseChange}
        />
      </CardContent>
    </Card>
  )
}
