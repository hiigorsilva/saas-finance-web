import { ActivityIcon, GaugeIcon, WalletMinimalIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import type { Metrics } from '@/services/dashboard/dashboard.d'
import { percentFormat } from '@/utils/percent-format'
import { DashboardCardTip } from './dashboard-card-tip'

type DashboardCardMetricsRatiosProps = {
  metrics: Metrics
}

type MetricRatioItemProps = {
  icon: ReactNode
  label: string
  value: number
  hint: string
  lowerIsBetter?: boolean
}

type MetricStatusTone = 'good' | 'warning' | 'risk'

function getStatusByThreshold(
  value: number,
  thresholds: { good: number; warning: number },
  lowerIsBetter = false
): MetricStatusTone {
  if (lowerIsBetter) {
    if (value <= thresholds.good) return 'good'
    if (value <= thresholds.warning) return 'warning'
    return 'risk'
  }

  if (value >= thresholds.good) return 'good'
  if (value >= thresholds.warning) return 'warning'
  return 'risk'
}

function MetricStatusBadge({ tone }: { tone: MetricStatusTone }) {
  const label =
    tone === 'good' ? 'Bom' : tone === 'warning' ? 'Atenção' : 'Risco'

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium leading-none',
        tone === 'good' && 'text-green-600 bg-green-500/10 border-green-500/25',
        tone === 'warning' &&
          'text-amber-600 bg-amber-500/10 border-amber-500/25',
        tone === 'risk' && 'text-red-600 bg-red-500/10 border-red-500/25'
      )}
    >
      {label}
    </span>
  )
}

function MetricRatioItem({
  icon,
  label,
  value,
  hint,
  lowerIsBetter = false,
}: MetricRatioItemProps) {
  const parsed = Number(value) || 0
  const clamped = Math.max(0, Math.min(parsed, 100))
  const status = getStatusByThreshold(
    clamped,
    {
      good: lowerIsBetter ? 60 : 20,
      warning: lowerIsBetter ? 80 : 10,
    },
    lowerIsBetter
  )

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium text-sm text-foreground leading-none">
            {label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <MetricStatusBadge tone={status} />
          <strong className="font-semibold text-sm text-foreground leading-none">
            {percentFormat(parsed, 1)}
          </strong>
        </div>
      </div>

      <Progress value={clamped} className="h-1.5" />

      <p className="text-[11px] text-muted-foreground leading-snug">{hint}</p>
    </div>
  )
}

export function DashboardCardMetricsRatios({
  metrics,
}: DashboardCardMetricsRatiosProps) {
  return (
    <Card className="flex flex-col flex-auto">
      <CardHeader className="gap-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-center">Indicadores financeiros</CardTitle>
          <DashboardCardTip
            label="Indicadores financeiros"
            description="Mostra sua saúde financeira em linguagem simples: quanto você consegue guardar, quanto da renda está sendo consumida e qual parte da renda está comprometida com despesas."
          />
        </div>
        <Separator />
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <MetricRatioItem
          icon={
            <WalletMinimalIcon className="size-4 shrink-0 text-emerald-500" />
          }
          label="Quanto você conseguiu guardar"
          value={metrics.savingsRate}
          hint="Percentual da sua renda que sobrou no mês."
        />

        <MetricRatioItem
          icon={<GaugeIcon className="size-4 shrink-0 text-amber-500" />}
          label="Ritmo de consumo da renda"
          value={metrics.burnRate}
          hint="Mostra o quanto da sua renda está sendo consumida. Menor é melhor."
          lowerIsBetter
        />

        <MetricRatioItem
          icon={<ActivityIcon className="size-4 shrink-0 text-sky-500" />}
          label="Renda comprometida com despesas"
          value={metrics.expenseRatio}
          hint="Percentual da renda usado para pagar despesas. Menor é melhor."
          lowerIsBetter
        />

        <div className="rounded-md border border-dashed p-3 text-xs leading-snug text-muted-foreground">
          <div className="mb-2 font-medium text-xs text-foreground">
            Legenda
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-green-500" />
              <span>Situação saudável</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-yellow-500" />
              <span>Atenção</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-red-500" />
              <span>Risco e necessidade de ajuste</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
