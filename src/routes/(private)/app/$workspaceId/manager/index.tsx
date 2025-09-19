import { createFileRoute } from '@tanstack/react-router'
import { CalendarIcon, ChevronLeftIcon, PlusIcon } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { TitleIconPage } from '@/components/layout/title-icon-page'
import { TitlePage } from '@/components/layout/title-page'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TransactionTableEmpty } from '../transaction/-components/transaction-table-empty'

export const Route = createFileRoute('/(private)/app/$workspaceId/manager/')({
  component: ManagerPage,
})

function ManagerPage() {
  const router = Route.useNavigate()
  const { workspaceId } = Route.useParams()

  const handleNavigateBack = () => {
    router({
      to: '/app/$workspaceId',
      params: { workspaceId: workspaceId },
    })
  }

  return (
    <Container className="gap-6 py-6">
      <div className="flex flex-col justify-between gap-6">
        {/* TITLE */}
        <div className="flex items-center gap-2">
          <TitleIconPage handleNavigateBack={handleNavigateBack}>
            <ChevronLeftIcon />
          </TitleIconPage>
          <TitlePage>Gerenciar Finanças</TitlePage>
        </div>

        <Card className="w-full flex-auto grid grid-cols-3 gap-6 py-6 px-6">
          <div className="flex flex-col gap-4 col-span-1 col-start-1">
            {/* TITLE */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-start items-center gap-2">
                <CalendarIcon
                  className="size-4 shrink-0 text-foreground"
                  strokeWidth={2}
                />
                <h2 className="font-semibold text-lg text-foreground leading-none">
                  Lembretes de faturas recorrentes
                </h2>
              </div>

              <p className="font-normal text-base text-muted-foreground">
                Crie gastos com recorrências semanais, mensais e anuais para
                nunca se esquecer de pagar.
              </p>
            </div>

            {/* BUTTON ACTION */}
            <div className="flex flex-col gap-2">
              <Button className="w-fit" variant="gradient">
                <PlusIcon />
                Criar lembrete
              </Button>

              <span className="font-normal text-sm text-muted-foreground">
                Recorrências criadas: 3/10
              </span>
            </div>
          </div>

          {/* TABLE */}
          <div className="col-span-2 col-start-2 border border-primary/25 rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/10">
                  <TableHead className="min-w-32 w-full text-foreground">
                    Nome
                  </TableHead>
                  <TableHead className="min-w-32 w-fit text-foreground">
                    Status
                  </TableHead>
                  <TableHead className="min-w-32 w-fit text-foreground">
                    Frequência
                  </TableHead>
                  <TableHead className="min-w-32 w-fit text-foreground">
                    Vencimento
                  </TableHead>
                  <TableHead className="min-w-32 w-fit text-foreground">
                    Valor
                  </TableHead>
                  <TableHead className="min-w-20 w-fit text-center text-foreground">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {/*
                <TableRow className="bg-primary/[2%] border-primary/10">
                  <TableCell>Netflix</TableCell>
                  <TableCell>
                    <div
                      className={`w-fit h-fit flex justify-start items-center gap-1 ${transactionStatusBadgeColor('ACTIVE')} rounded-full border px-2 py-0.5`}
                    >
                      <div
                        className={`size-1.5 rounded-full ${transactionStatusBulletColor('ACTIVE')}`}
                      />
                      <span className="inline-block font-normal text-sm tracking-tight leading-none">
                        {transactionStatusTranslate('ACTIVE')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>Mensal</TableCell>
                  <TableCell>Dia 08</TableCell>
                  <TableCell>{currencyFormat(29.4)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:border"
                      >
                        <PenIcon className="size-4 shrink-0 text-muted-foreground" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:border"
                      >
                        <Trash2 className="size-4 shrink-0 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                */}
              </TableBody>
            </Table>
            <div className="w-full flex flex-auto justify-center items-center py-6">
              <TransactionTableEmpty>
                Nenhuma transação recorrente registrada.{' '}
                <span className="inline-block">
                  Crie seu primeiro lembrete recorrente.
                </span>
              </TransactionTableEmpty>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  )
}
