import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { ITransaction } from '@/services/transaction/transaction.d'
import { DashboardCardWeekPaymentEmpty } from './dashboard-card-week-payment-empty'
import { DashboardCardWeekPaymentRow } from './dashboard-card-week-payment-row'

type DashboardCardWeekPaymentProps = {
  weekPayments: ITransaction[]
}

export function DashboardCardWeekPayment({
  weekPayments,
}: DashboardCardWeekPaymentProps) {
  return (
    <Card className="flex flex-col flex-auto">
      <CardHeader className="gap-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-center">Pagamentos da semana</CardTitle>
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
            className={`${weekPayments.length === 0 && 'flex flex-auto flex-col justify-center items-center'}`}
          >
            {weekPayments.length > 0 && (
              <DashboardCardWeekPaymentRow weekPayments={weekPayments} />
            )}

            {weekPayments.length === 0 && (
              <DashboardCardWeekPaymentEmpty>
                Nenhum pagamento para esta semana
              </DashboardCardWeekPaymentEmpty>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
