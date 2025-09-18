import { useNavigate } from '@tanstack/react-router'
import { BanknoteIcon, BarcodeIcon, CreditCardIcon } from 'lucide-react'
import { PixIcon } from '@/assets/icons/pix'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
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
import { DashboardCardIcon } from './dashboard-card-icon'

type DashBoardCardLastTransactionsProps = {
  transactions: TransactionType[]
}

export function DashBoardCardLastTransactions({
  transactions,
}: DashBoardCardLastTransactionsProps) {
  const router = useNavigate()

  const handleGoToTransactionsPage = () => {
    router({
      to: '/app/$workspaceId/transaction',
      params: { workspaceId: 'buncker_id' },
    })
  }

  const handleTransactionTypeColor = (transactionType: string) => {
    switch (transactionType) {
      case 'INCOME':
        return 'text-green-500'

      case 'EXPENSE':
        return 'text-red-500'

      case 'INVESTIMENT':
        return 'text-blue-500'

      default:
        return 'text-foreground'
    }
  }

  const handleTransactionTypeTranslate = (transactionType: string) => {
    switch (transactionType) {
      case 'INCOME':
        return 'Receita'

      case 'EXPENSE':
        return 'Despesa'

      case 'INVESTIMENT':
        return 'Investimento'

      default:
        return 'Outro'
    }
  }

  const handleSetIconByPaymentMethod = (transactionType: string) => {
    switch (transactionType) {
      case 'CREDIT_CARD':
        return (
          <CreditCardIcon
            className="size-5 shrink-0 text-primary"
            strokeWidth={1.5}
          />
        )

      case 'DEBIT_CARD':
        return (
          <CreditCardIcon
            className="size-5 shrink-0 text-primary"
            strokeWidth={1.5}
          />
        )

      case 'BANK_SLIP':
        return (
          <BarcodeIcon
            className="size-5 shrink-0 text-primary"
            strokeWidth={1.5}
          />
        )

      case 'CASH':
        return (
          <BanknoteIcon
            className="size-5 shrink-0 text-primary"
            strokeWidth={1.5}
          />
        )

      case 'PIX':
        return (
          <PixIcon className="size-5 shrink-0 text-primary" strokeWidth={1.5} />
        )

      default:
        return (
          <BanknoteIcon
            className="size-5 shrink-0 text-primary"
            strokeWidth={1.5}
          />
        )
    }
  }

  return (
    <Card>
      <CardHeader className="gap-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-center">Últimas transações</CardTitle>

          <Button
            variant="outline"
            size="sm"
            onClick={handleGoToTransactionsPage}
          >
            Ver todos
          </Button>
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="flex justify-center items-center gap-6">
        <Table>
          <TableHeader className="sr-only">
            <TableRow>
              <TableHead className="w-full">Nome</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map(transaction => (
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
                        {handleTransactionTypeTranslate(
                          transaction.type
                        ).toLowerCase()}
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
