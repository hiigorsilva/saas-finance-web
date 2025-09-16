import { ArrowDownIcon, TrendingDownIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { currencyFormat } from '@/utils/currency-format'
import { percentFormat } from '@/utils/percent-format'
import { DashboardCardIcon } from './dashboard-card-icon'

export function DashBoardCardExpense() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2">
        {/* LABEL */}
        <div className="flex justify-start items-center gap-2">
          <DashboardCardIcon className="bg-red-500/10 border border-red-500/25">
            <TrendingDownIcon
              className="size-5 shrink-0 text-red-500"
              strokeWidth={1}
            />
          </DashboardCardIcon>

          <h2 className="font-normal text-sm text-muted-foreground leading-none tracking-tight">
            Despesas
          </h2>
        </div>

        {/* AMOUNT */}
        <div className="flex flex-col gap-2">
          <strong className="inline-block font-semibold text-xl text-foreground leading-none tracking-tight">
            {currencyFormat(2500)}
          </strong>

          <div className="flex justify-start items-center gap-2">
            <div className="w-fit h-fit flex justify-center items-center gap-1 text-xs text-red-500 bg-red-500/10 border border-red-500/25 rounded-full pl-1.5 pr-2 py-0.5">
              <ArrowDownIcon className="size-3 shrink-0 text-red-500" />
              {percentFormat(0.48)}
            </div>
            <span className="inline-block font-normal text-xs text-muted-foreground leading-none">
              em relação ao mês anterior
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
