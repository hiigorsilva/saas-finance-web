import { ClockIcon } from 'lucide-react'
import { TableCell, TableRow } from '@/components/ui/table'
import type { TransactionType } from '@/data/requests/transactions'

type LatePaymentTransactionRowProps = {
  latePayment: TransactionType[]
}

export function LatePaymentTransactionRow({
  latePayment,
}: LatePaymentTransactionRowProps) {
  console.log('LatePayment:', latePayment)

  return (
    <TableRow className="border-none">
      <TableCell className="font-semibold">
        <div className="w-full flex justify-between items-center gap-3">
          <div className="flex flex-col">
            <h3 className="font-semibold text-base text-foreground">
              Assinatura Netflix
            </h3>
            <span className="font-normal text-sm text-muted-foreground">
              30 Nov de 2024
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col items-end gap-1">
          <div className="w-fit h-fit flex justify-center items-center gap-1 text-sm text-red-500 leading-none bg-red-500/10 border border-red-500/25 rounded-full pl-1.5 pr-2 py-1">
            <ClockIcon className="size-3 shrink-0 text-red-500" />
            Atrasada
          </div>
          <span className="inline-flex font-normal text-xs text-muted-foreground capitalize leading-none px-1">
            Amanhã
          </span>
        </div>
      </TableCell>
    </TableRow>
  )
}
