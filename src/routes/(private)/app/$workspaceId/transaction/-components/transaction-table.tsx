import { PenIcon, Trash2Icon } from 'lucide-react'
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
import { dateFormat } from '@/utils/date-format'
import {
  transactionCategoryTranslate,
  transactionPaymentMethodTranslate,
  transactionTypeBadgeColor,
  transactionTypeBulletColor,
  transactionTypeTranslate,
} from '../../-utils/transactions'

type TransactionTableProps = {
  transactions: TransactionType[]
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="border border-primary/20 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary/10">
            <TableHead>Nome</TableHead>
            <TableHead className="w-40 font-semibold">Valor</TableHead>
            <TableHead className="w-40 font-semibold">Tipo</TableHead>
            <TableHead className="w-48 font-semibold">Categoria</TableHead>
            <TableHead className="w-40 font-semibold">Pagamento</TableHead>
            <TableHead className="w-32 font-semibold">Data</TableHead>
            <TableHead className="w-28 font-semibold text-center">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 &&
            transactions.map(transaction => (
              <TableRow
                key={transaction.id}
                className="bg-primary/[2%] border-primary/10"
              >
                <TableCell className="text-foreground tracking-tight">
                  {transaction.name}
                </TableCell>
                <TableCell className="text-foreground tracking-tight">
                  {currencyFormat(transaction.amount)}
                </TableCell>
                <TableCell>
                  <div
                    className={`w-fit h-fit flex justify-start items-center gap-1 ${transactionTypeBadgeColor(transaction.type)} rounded-full border px-2 py-0.5`}
                  >
                    <div
                      className={`size-1.5 rounded-full ${transactionTypeBulletColor(transaction.type)}`}
                    />
                    <span className="inline-block font-normal text-sm tracking-tight leading-none">
                      {transactionTypeTranslate(transaction.type)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-foreground tracking-tight">
                  {transactionCategoryTranslate(transaction.category)}
                </TableCell>
                <TableCell className="text-foreground tracking-tight">
                  {transactionPaymentMethodTranslate(transaction.paymentMethod)}
                </TableCell>
                <TableCell className="text-foreground tracking-tight">
                  {dateFormat(transaction.paymentDate)}
                </TableCell>
                <TableCell>
                  <div className="max-w-24 w-full flex justify-center items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <PenIcon className="size-4 shrink-0 text-muted-foreground" />
                    </Button>

                    <Button variant="ghost" size="icon">
                      <Trash2Icon className="size-4 shrink-0 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
