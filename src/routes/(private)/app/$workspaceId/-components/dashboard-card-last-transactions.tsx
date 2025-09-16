import { useNavigate } from '@tanstack/react-router'
import { BanknoteIcon } from 'lucide-react'
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
import { currencyFormat } from '@/utils/currency-format'
import { DashboardCardIcon } from './dashboard-card-icon'

export function DashBoardCardLastTransactions() {
  const router = useNavigate()

  const handleGoToTransactionsPage = () => {
    router({
      to: '/app/$workspaceId/transaction',
      params: { workspaceId: 'buncker_id' },
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
            <TableRow>
              <TableCell className="font-semibold">
                <div className="w-full flex items-center gap-3">
                  <DashboardCardIcon>
                    <BanknoteIcon className="size-5 shrink-0 text-primary" />
                  </DashboardCardIcon>

                  <div className="flex flex-col">
                    <h3 className="font-semibold text-base text-foreground">
                      Assinatura Netflix
                    </h3>
                    <span className="font-normal text-sm text-muted-foreground">
                      30 Nov de 2024
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-semibold text-right">
                {currencyFormat(29)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
