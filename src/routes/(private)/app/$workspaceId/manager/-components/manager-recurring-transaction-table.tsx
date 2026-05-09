import { PenIcon, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { TransactionType } from '@/data/requests/transactions'
import { currencyFormat } from '@/utils/currency-format'
import {
  transactionStatusBadgeColor,
  transactionStatusBulletColor,
  transactionStatusTranslate,
} from '../../-utils/transactions'

type ManagerRecurringTransactionTableProps = {
  transactions: TransactionType[]
}

export function ManagerRecurringTransactionTable({
  transactions,
}: ManagerRecurringTransactionTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-primary/10">
          <TableHead className="min-w-32 w-full text-foreground">
            Nome
          </TableHead>
          <TableHead className="min-w-32 w-fit text-foreground">
            Status
          </TableHead>
          <TableHead className="min-w-32 w-fit text-foreground">
            Frequência
          </TableHead>
          <TableHead className="min-w-32 w-fit text-foreground">
            Vencimento
          </TableHead>
          <TableHead className="min-w-32 w-fit text-foreground">
            Valor
          </TableHead>
          <TableHead className="min-w-20 w-fit text-center text-foreground">
            Ações
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {transactions.length > 0 &&
          transactions.map(transaction => (
            <TableRow
              key={transaction.id}
              className="bg-primary/[1%] border-primary/10"
            >
              <TableCell>Netflix</TableCell>
              <TableCell>
                <div
                  className={`w-fit h-fit flex justify-start items-center gap-1 ${transactionStatusBadgeColor('ACTIVE')} rounded-full border px-2 py-0.5`}
                >
                  <div
                    className={`size-1.5 rounded-full ${transactionStatusBulletColor('ACTIVE')}`}
                  />
                  <span className="inline-block font-normal text-sm tracking-tight leading-none">
                    {transactionStatusTranslate('ACTIVE')}
                  </span>
                </div>
              </TableCell>
              <TableCell>Mensal</TableCell>
              <TableCell>Dia 08</TableCell>
              <TableCell>{currencyFormat(29.4)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="hover:border">
                    <PenIcon className="size-4 shrink-0 text-muted-foreground" />
                  </Button>

                  <Button variant="ghost" size="icon" className="hover:border">
                    <Trash2 className="size-4 shrink-0 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
