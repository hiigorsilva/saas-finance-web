import { TableCell, TableRow } from '@/components/ui/table'
import type { TransactionType } from '@/data/requests/transactions'
import { currencyFormat } from '@/utils/currency-format'
import { dateFormat } from '@/utils/date-format'
import {
  handleSetIconByPaymentMethod,
  handleTransactionTypeColor,
  handleTransactionTypeTranslate,
} from '../-utils/transactions'
import { DashboardCardIcon } from './dashboard-card-icon'

type DashBoardCardLastTransactionsRowProps = {
  transaction: TransactionType
}

export function DashBoardCardLastTransactionsRow({
  transaction,
}: DashBoardCardLastTransactionsRowProps) {
  return (
    <TableRow key={transaction.id} className="border-none">
      <TableCell className="font-semibold">
        <div className="w-full flex items-start gap-3">
          <DashboardCardIcon>
            {handleSetIconByPaymentMethod(transaction.paymentMethod)}
          </DashboardCardIcon>

          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-base text-foreground leading-none">
              {transaction.name}
            </h3>
            <span className="font-normal text-sm text-muted-foreground">
              {dateFormat(transaction.paymentDate)}
            </span>
          </div>

          <div className="w-fit h-fit flex justify-center items-center border rounded-full px-2 py-0.5">
            <span
              className={`inline-block font-normal text-xs ${handleTransactionTypeColor(transaction.type)} capitalize leading-none`}
            >
              {handleTransactionTypeTranslate(transaction.type).toLowerCase()}
            </span>
          </div>
        </div>
      </TableCell>

      <TableCell
        className={`font-semibold ${handleTransactionTypeColor(transaction.type)} text-right`}
      >
        {transaction.type === 'INCOME' ? '+' : '-'}
        {currencyFormat(transaction.amount)}
      </TableCell>
    </TableRow>
  )
}
