import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { TransactionType } from '@/data/requests/transactions'
import { Route } from '../layout'
import { DashBoardCardLastTransactionsEmpty } from './dashboard-card-last-transaction-empty'
import { DashBoardCardLastTransactionsRow } from './dashboard-card-last-transaction-row'

type DashBoardCardLastTransactionsProps = {
  transactions: TransactionType[]
}

export function DashBoardCardLastTransactions({
  transactions,
}: DashBoardCardLastTransactionsProps) {
  const router = useNavigate()
  const match = Route.useMatch()

  const handleGoToTransactionsPage = () => {
    router({
      to: '/app/$workspaceId/transaction',
      params: { workspaceId: match.params.workspaceId },
    })
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
            {transactions.length > 0 &&
              transactions.map(transaction => (
                <DashBoardCardLastTransactionsRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}

            {transactions.length === 0 && (
              <DashBoardCardLastTransactionsEmpty>
                Nenhuma transação registrada este mês
              </DashBoardCardLastTransactionsEmpty>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
