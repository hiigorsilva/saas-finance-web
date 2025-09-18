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
import { LatePaymentTransactionEmpty } from './dashboard-card-late-payment-empty'
import { LatePaymentTransactionRow } from './dashboard-card-late-payment-row'

type DashboardCardLatePaymentProps = {
  latePayments: TransactionType[]
}

export function DashboardCardLatePayment({
  latePayments,
}: DashboardCardLatePaymentProps) {
  return (
    <Card className="flex flex-col flex-auto">
      <CardHeader className="gap-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-center">Pagamentos atrasados</CardTitle>
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-auto justify-center items-center gap-6">
        <Table>
          <TableHeader className="sr-only">
            <TableRow>
              <TableHead className="w-full">Nome</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody
            className={`${latePayments.length === 0 && 'flex flex-auto flex-col justify-center items-center'}`}
          >
            {latePayments.length > 0 && (
              <LatePaymentTransactionRow latePayment={latePayments} />
            )}

            {latePayments.length === 0 && (
              <LatePaymentTransactionEmpty>
                Nenhum pagamento atrasado
              </LatePaymentTransactionEmpty>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
