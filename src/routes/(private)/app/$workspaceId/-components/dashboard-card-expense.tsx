import { ArrowDownIcon, ArrowUpIcon, TrendingDownIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { currencyFormat } from '@/utils/currency-format'
import { percentFormat } from '@/utils/percent-format'
import { DashboardCardIcon } from './dashboard-card-icon'

type DashBoardCardExpenseProps = {
  showAmount: boolean
  expenseValue: number
  expensePercent: number
}

export function DashBoardCardExpense({
  showAmount,
  expenseValue,
  expensePercent,
}: DashBoardCardExpenseProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2">
        {/* LABEL */}
        <div className="flex justify-start items-center gap-2">
          <DashboardCardIcon className="bg-red-500/10 border border-red-500/25">
            <TrendingDownIcon
              className="size-5 shrink-0 text-red-500"
              strokeWidth={2}
            />
          </DashboardCardIcon>

          <h2 className="font-normal text-sm text-muted-foreground leading-none tracking-tight">
            Despesas
          </h2>
        </div>

        {/* AMOUNT */}
        <div className="flex flex-col gap-2">
          <strong className="inline-block font-semibold text-xl text-foreground leading-none tracking-tight">
            {!showAmount && currencyFormat(expenseValue)}
            {showAmount && 'R$ ******'}
          </strong>

          <div className="flex justify-start items-center gap-2">
            <div
              className={`w-fit h-fit flex justify-center items-center gap-1 text-xs text-${expensePercent >= 0 ? 'green' : 'red'}-500 bg-${expensePercent >= 0 ? 'green' : 'red'}-500/10 border border-${expensePercent >= 0 ? 'green' : 'red'}-500/25 rounded-full pl-1.5 pr-2 py-0.5`}
            >
              {expensePercent >= 0 && (
                <ArrowUpIcon className="size-3 shrink-0 text-green-500" />
              )}
              {expensePercent < 0 && (
                <ArrowDownIcon className="size-3 shrink-0 text-red-500" />
              )}
              {!showAmount && percentFormat(expensePercent, 1)}
              {showAmount && '****%'}
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
