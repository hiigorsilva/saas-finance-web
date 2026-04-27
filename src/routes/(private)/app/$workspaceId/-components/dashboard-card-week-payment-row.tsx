import { ClockIcon } from 'lucide-react'
import { TableCell, TableRow } from '@/components/ui/table'
import type { TransactionType } from '@/data/requests/transactions'
import {
  dateFormat,
  dateFormatDistanceToNow,
  dateIsBeforeToday,
} from '@/utils/date-format'

type DashboardCardWeekPaymentRowProps = {
  weekPayments: TransactionType[]
}

export function DashboardCardWeekPaymentRow({
  weekPayments,
}: DashboardCardWeekPaymentRowProps) {
  return (
    <>
      {weekPayments.map(payment => (
        <TableRow key={payment.id}>
          <TableCell className="font-semibold">
            <div className="w-full flex justify-between items-center gap-3">
              <div className="flex flex-col">
                <h3 className="font-semibold text-base text-foreground">
                  {payment.name}
                </h3>
                <span className="font-normal text-sm text-muted-foreground">
                  {dateFormat(payment.paymentDate)}
                </span>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex flex-col items-end gap-1">
              <div className="w-fit h-fit flex justify-center items-center gap-1 text-sm text-blue-500 leading-none bg-blue-500/10 border border-blue-500/25 rounded-full pl-1.5 pr-2 py-1">
                <ClockIcon className="size-3 shrink-0 text-blue-500" />
                {dateIsBeforeToday(payment.paymentDate)
                  ? 'Atrasada'
                  : 'Pendente'}
              </div>
              <span className="inline-flex font-normal text-xs text-muted-foreground capitalize leading-none px-1">
                {dateFormatDistanceToNow(payment.paymentDate)}
              </span>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
