import { ClockIcon } from 'lucide-react'
import { TableCell, TableRow } from '@/components/ui/table'
import type { ITransaction } from '@/services/transaction/transaction.d'
import {
  dateFormat,
  dateFormatDistanceToNow,
  dateIsBeforeToday,
} from '@/utils/date-format'

type LatePaymentTransactionRowProps = {
  latePayment: ITransaction[]
}

export function LatePaymentTransactionRow({
  latePayment,
}: LatePaymentTransactionRowProps) {
  return (
    <>
      {latePayment.map(item => (
        <TableRow key={item.id} className="border-none">
          <TableCell className="font-semibold">
            <div className="w-full flex justify-between items-center gap-3">
              <div className="flex flex-col">
                <h3 className="font-semibold text-base text-foreground">
                  {item.name}
                </h3>
                <span className="font-normal text-sm capitalize text-muted-foreground">
                  {dateFormat(item.paymentDate)}
                </span>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex flex-col items-end gap-1">
              <div className="w-fit h-fit flex justify-center items-center gap-1 text-sm text-red-500 leading-none bg-red-500/10 border border-red-500/25 rounded-full pl-1.5 pr-2 py-1">
                <ClockIcon className="size-3 shrink-0 text-red-500" />
                {dateIsBeforeToday(item.paymentDate) ? 'Atrasado' : 'Pendente'}
              </div>
              <span className="inline-flex font-normal text-xs text-muted-foreground capitalize leading-none px-1">
                {dateFormatDistanceToNow(item.paymentDate)}
              </span>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
