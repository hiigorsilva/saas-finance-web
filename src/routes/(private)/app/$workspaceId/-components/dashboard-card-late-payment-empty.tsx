import { CheckCircle2Icon } from 'lucide-react'
import type { ComponentProps } from 'react'
import { TableCell, TableRow } from '@/components/ui/table'

type LatePaymentTransactionEmpty = ComponentProps<'tr'>

export function LatePaymentTransactionEmpty({
  children,
}: LatePaymentTransactionEmpty) {
  return (
    <TableRow className="hover:bg-background">
      <TableCell>
        <div className="flex flex-col justify-center items-center gap-2">
          <CheckCircle2Icon
            className="size-6 shrink-0 text-green-500"
            strokeWidth={2}
          />
          <span className="inline-block font-normal text-sm text-muted-foreground">
            {children}
          </span>
        </div>
      </TableCell>
    </TableRow>
  )
}
