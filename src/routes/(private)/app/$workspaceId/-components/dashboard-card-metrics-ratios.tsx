import { ActivityIcon, GaugeIcon, WalletMinimalIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import type { Metrics } from '@/services/dashboard/dashboard.d'
import { percentFormat } from '@/utils/percent-format'

type DashboardCardMetricsRatiosProps = {
  metrics: Metrics
}

type MetricRatioItemProps = {
  icon: ReactNode
  label: string
  value: number
}

function MetricRatioItem({ icon, label, value }: MetricRatioItemProps) {
  const parsed = Number(value) || 0
  const clamped = Math.max(0, Math.min(parsed, 100))

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium text-sm text-foreground leading-none">
            {label}
          </span>
        </div>

        <strong className="font-semibold text-sm text-foreground leading-none">
          {percentFormat(parsed, 1)}
        </strong>
      </div>

      <Progress value={clamped} className="h-1.5" />
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
        </div>
        <Separator />
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <MetricRatioItem
          icon={
            <WalletMinimalIcon className="size-4 shrink-0 text-emerald-500" />
          }
          label="Taxa de poupança"
          value={metrics.savingsRate}
        />

        <MetricRatioItem
          icon={<GaugeIcon className="size-4 shrink-0 text-amber-500" />}
          label="Burn rate"
          value={metrics.burnRate}
        />

        <MetricRatioItem
          icon={<ActivityIcon className="size-4 shrink-0 text-sky-500" />}
          label="Relação despesa/receita"
          value={metrics.expenseRatio}
        />
      </CardContent>
    </Card>
  )
}
