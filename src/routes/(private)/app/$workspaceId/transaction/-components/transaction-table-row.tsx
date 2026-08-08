import {
  CalendarDaysIcon,
  CircleDollarSignIcon,
  PenIcon,
  TagIcon,
  Trash2Icon,
  WalletIcon,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import type { ITransaction } from '@/services/transaction/transaction.d'
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
  transaction: ITransaction
}

export function TransactionTableRow({ transaction }: TransactionTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  return (
    <>
      <TableRow className="hover:bg-primary/5 border-primary/10">
        <TableCell className="text-foreground tracking-tight">
          <Button
            variant="ghost"
            className="h-auto px-0 font-medium hover:bg-transparent hover:underline"
            onClick={() => setIsDetailsOpen(true)}
          >
            {transaction.name}
          </Button>
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
            <TransactionTableActionEdit transaction={transaction}>
              <Button variant="ghost" size="icon">
                <PenIcon className="size-4 shrink-0 text-muted-foreground" />
              </Button>
            </TransactionTableActionEdit>

            <TransactionTableActionRemove transaction={transaction}>
              <Button variant="ghost" size="icon">
                <Trash2Icon className="size-4 shrink-0 text-red-500" />
              </Button>
            </TransactionTableActionRemove>
          </div>
        </TableCell>
      </TableRow>

      <TransactionRowDetails
        transaction={transaction}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />
    </>
  )
}

type TransactionRowDetailsProps = {
  transaction: ITransaction
  open: boolean
  onOpenChange: (open: boolean) => void
}

function TransactionRowDetails({
  transaction,
  open,
  onOpenChange,
}: TransactionRowDetailsProps) {
  if (!open) return null

  const transactionType = transactionTypeTranslate(transaction.type)
  const transactionCategory = transactionCategoryTranslate(transaction.category)
  const transactionPaymentMethod = transactionPaymentMethodTranslate(
    transaction.paymentMethod
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-xl">
        <div className="border-b bg-muted/30 p-6">
          <DialogHeader className="text-left">
            <DialogTitle className="text-xl tracking-tight">
              {transaction.name}
            </DialogTitle>
            <DialogDescription className="mt-1 leading-relaxed">
              {transaction.description || 'Sem descricao para esta transacao.'}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-5 p-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border bg-card p-4">
              <div className="mb-1 flex items-center gap-2 text-xs tracking-wide text-muted-foreground">
                <CircleDollarSignIcon className="size-3.5" />
                Valor
              </div>
              <p className="text-lg font-semibold tracking-tight text-foreground">
                {currencyFormat(transaction.amount)}
              </p>
            </div>

            <div className="rounded-xl border bg-card p-4">
              <div className="mb-1 flex items-center gap-2 text-xs tracking-wide text-muted-foreground">
                <CalendarDaysIcon className="size-3.5" />
                Data de pagamento
              </div>
              <p className="text-lg font-semibold tracking-tight text-foreground">
                {dateFormat(transaction.paymentDate)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border bg-card p-4">
              <div className="mb-2 text-xs tracking-wide text-muted-foreground">
                Tipo
              </div>
              <div
                className={`w-fit h-fit flex items-center gap-1 rounded-full border px-2 py-0.5 ${transactionTypeBadgeColor(transaction.type)}`}
              >
                <div
                  className={`size-1.5 rounded-full ${transactionTypeBulletColor(transaction.type)}`}
                />
                <span className="inline-block text-sm leading-none tracking-tight">
                  {transactionType}
                </span>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-4">
              <div className="mb-1 flex items-center gap-2 text-xs tracking-wide text-muted-foreground">
                <TagIcon className="size-3.5" />
                Categoria
              </div>
              <p className="text-base font-medium tracking-tight text-foreground">
                {transactionCategory}
              </p>
            </div>

            <div className="rounded-xl border bg-card p-4 sm:col-span-2">
              <div className="mb-1 flex items-center gap-2 text-xs tracking-wide text-muted-foreground">
                <WalletIcon className="size-3.5" />
                Metodo de pagamento
              </div>
              <p className="text-base font-medium tracking-tight text-foreground">
                {transactionPaymentMethod}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
