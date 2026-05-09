import { PenIcon, Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
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
import { TransactionTableActionEdit } from './transaction-table-action-edit'
import { TransactionTableActionRemove } from './transaction-table-action-remove'

type TransactionTableRowProps = {
  transaction: TransactionType
  onFetchData: () => Promise<void>
}

export function TransactionTableRow({
  transaction,
  onFetchData,
}: TransactionTableRowProps) {
  return (
    <TableRow className="hover:bg-primary/[5%] border-primary/10">
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
          <TransactionTableActionEdit
            transaction={transaction}
            onFetchData={onFetchData}
          >
            <Button variant="ghost" size="icon">
              <PenIcon className="size-4 shrink-0 text-muted-foreground" />
            </Button>
          </TransactionTableActionEdit>

          <TransactionTableActionRemove
            transaction={transaction}
            onFetchData={onFetchData}
          >
            <Button variant="ghost" size="icon">
              <Trash2Icon className="size-4 shrink-0 text-red-500" />
            </Button>
          </TransactionTableActionRemove>
        </div>
      </TableCell>
    </TableRow>
  )
}
