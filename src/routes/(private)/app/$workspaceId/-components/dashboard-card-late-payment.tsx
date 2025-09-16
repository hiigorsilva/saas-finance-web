import { ClockIcon } from 'lucide-react'
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

export function DashboardCardLatePayment() {
  return (
    <Card>
      <CardHeader className="gap-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-center">Pagamentos atrasados</CardTitle>
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="flex justify-center items-center gap-6">
        <Table>
          <TableHeader className="sr-only">
            <TableRow>
              <TableHead className="w-full">Nome</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold">
                <div className="w-full flex justify-between items-center gap-3">
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
              <TableCell>
                <div className="flex flex-col items-end gap-1">
                  <div className="w-fit h-fit flex justify-center items-center gap-1 text-sm text-red-500 bg-red-500/10 border border-red-500/25 rounded-full pl-1.5 pr-2 py-0.5">
                    <ClockIcon className="size-3 shrink-0 text-red-500" />
                    Atrasada
                  </div>
                  <span className="inline-flex font-normal text-xs text-muted-foreground leading-none px-1">
                    Ontem
                  </span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
