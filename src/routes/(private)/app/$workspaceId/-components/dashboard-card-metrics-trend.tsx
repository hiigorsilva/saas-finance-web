import { ArrowDownIcon, ArrowUpIcon, LandmarkIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import type { Metrics } from '@/services/dashboard/dashboard.d'
import { currencyFormat } from '@/utils/currency-format'
import { percentFormat } from '@/utils/percent-format'
import { DashboardCardTip } from './dashboard-card-tip'

type DashboardCardMetricsTrendProps = {
  metrics: Metrics
}

type MetricChangeItemProps = {
  label: string
  value: number
  lowerIsBetter?: boolean
}

function MetricChangeItem({
  label,
  value,
  lowerIsBetter = false,
}: MetricChangeItemProps) {
  const isPositive = value >= 0
  const isStable = value === 0
  const isFavorable = lowerIsBetter ? value <= 0 : value >= 0
  const badgeLabel = isStable ? 'Estavel' : isFavorable ? 'Melhor' : 'Pior'

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center gap-3">
        <span className="font-medium text-sm text-muted-foreground leading-none">
          {label}
        </span>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              'inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium leading-none',
              isStable && 'text-amber-600 bg-amber-500/10 border-amber-500/25',
              !isStable &&
                isFavorable &&
                'text-green-600 bg-green-500/10 border-green-500/25',
              !isStable &&
                !isFavorable &&
                'text-red-600 bg-red-500/10 border-red-500/25'
            )}
          >
            {badgeLabel}
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
      </div>

      <p className="text-[11px] text-muted-foreground leading-snug">
        {lowerIsBetter
          ? 'Quando esse numero cai, o resultado tende a melhorar.'
          : 'Quando esse numero sobe, o resultado tende a melhorar.'}
      </p>
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
          <DashboardCardTip
            label="Tendência mensal"
            description="Mostra para onde seu mes esta indo: saldo esperado no fim do periodo e evolucao de entradas e gastos em relacao ao mes anterior."
          />
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
          label="Evolucao das entradas"
          value={metrics.incomeChange}
        />
        <MetricChangeItem
          label="Evolucao dos gastos"
          value={metrics.expenseChange}
          lowerIsBetter
        />

        <div className="rounded-md border border-dashed p-3 text-xs leading-snug text-muted-foreground">
          <div className="mb-2 font-medium text-xs text-foreground">
            Legenda
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-green-500" />
              <span>Direção favorável</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-yellow-500" />
              <span>Sem mudança relevante</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-red-500" />
              <span>Precisa acompanhar de perto</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
