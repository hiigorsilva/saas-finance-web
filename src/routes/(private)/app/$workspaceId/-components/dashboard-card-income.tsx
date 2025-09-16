import { ArrowUpIcon, TrendingUpIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { currencyFormat } from '@/utils/currency-format'
import { percentFormat } from '@/utils/percent-format'
import { DashboardCardIcon } from './dashboard-card-icon'

export function DashBoardCardIncome() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2">
        {/* LABEL */}
        <div className="flex justify-start items-center gap-2">
          <DashboardCardIcon className="bg-green-500/10 border border-green-500/25">
            <TrendingUpIcon
              className="size-5 shrink-0 text-green-500"
              strokeWidth={2}
            />
          </DashboardCardIcon>

          <h2 className="font-normal text-sm text-muted-foreground leading-none tracking-tight">
            Receitas
          </h2>
        </div>

        {/* AMOUNT */}
        <div className="flex flex-col gap-2">
          <strong className="inline-block font-semibold text-xl text-foreground leading-none tracking-tight">
            {currencyFormat(7700)}
          </strong>

          <div className="flex justify-start items-center gap-2">
            <div className="w-fit h-fit flex justify-center items-center gap-1 text-xs text-green-500 bg-green-500/10 border border-green-500/25 rounded-full pl-1.5 pr-2 py-0.5">
              <ArrowUpIcon className="size-3 shrink-0 text-green-500" />
              {percentFormat(1.08)}
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
