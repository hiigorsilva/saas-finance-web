import { ClockIcon } from 'lucide-react'
import { TableCell, TableRow } from '@/components/ui/table'
import type { TransactionType } from '@/data/requests/transactions'

type DashboardCardWeekPaymentRowProps = {
  weekPayments: TransactionType[]
}

export function DashboardCardWeekPaymentRow({
  weekPayments,
}: DashboardCardWeekPaymentRowProps) {
  console.log('Week Payments:', weekPayments)

  return (
    <TableRow>
      <TableCell className="font-semibold">
        <div className="w-full flex justify-between items-center gap-3">
          <div className="flex flex-col">
            <h3 className="font-semibold text-base text-foreground">
              Aluguel do apartamento
            </h3>
            <span className="font-normal text-sm text-muted-foreground">
              04 Dez de 2024
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col items-end gap-1">
          <div className="w-fit h-fit flex justify-center items-center gap-1 text-sm text-blue-500 leading-none bg-blue-500/10 border border-blue-500/25 rounded-full pl-1.5 pr-2 py-1">
            <ClockIcon className="size-3 shrink-0 text-blue-500" />
            Atrasada
          </div>
          <span className="inline-flex font-normal text-xs text-muted-foreground capitalize leading-none px-1">
            Ontem
          </span>
        </div>
      </TableCell>
    </TableRow>
  )
}
