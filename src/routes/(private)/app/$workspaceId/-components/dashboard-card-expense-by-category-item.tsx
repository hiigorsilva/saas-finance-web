import { TRANSACTION_CATEGORY_LABELS } from '@/data/labels/transaction-category'
import type { ExpenseByCategoryType } from '@/data/requests/expense-by-category'
import { currencyFormat } from '@/utils/currency-format'
import { percentFormat } from '@/utils/percent-format'

type DashboardCardExpenseByCategoryItemProps = {
  item: ExpenseByCategoryType
}

export function DashboardCardExpenseByCategoryItem({
  item,
}: DashboardCardExpenseByCategoryItemProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      {/* TITLE AND PERCENT */}
      <div className="flex justify-between items-center gap-6">
        <h3 className="font-semibold text-base text-foreground leading-none">
          {
            TRANSACTION_CATEGORY_LABELS[
              item.name as keyof typeof TRANSACTION_CATEGORY_LABELS
            ]
          }
        </h3>
        <span className="inline-block font-semibold text-base text-foreground leading-none">
          {percentFormat(item.progress, 0)}
        </span>
      </div>

      {/* PROGRESS */}
      <div className="w-full border rounded-full overflow-hidden">
        <div
          className="h-1.5 bg-primary rounded-full"
          style={{ width: `${item.progress}%` }}
        />
      </div>

      {/* EXPENSE */}
      <div className="flex justify-between items-center gap-6">
        <span className="inline-block font-normal text-sm text-muted-foreground leading-none">
          {currencyFormat(item.expense)}
        </span>
      </div>
    </div>
  )
}
