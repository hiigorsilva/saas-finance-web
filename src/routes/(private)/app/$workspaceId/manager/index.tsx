import { createFileRoute } from '@tanstack/react-router'
import { CalendarIcon, ChevronLeftIcon, PlusIcon } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { TitleIconPage } from '@/components/layout/title-icon-page'
import { TitlePage } from '@/components/layout/title-page'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TRANSACTION_CATEGORY_TYPE_VALUES } from '@/data/labels/transaction-category'
import type { TransactionType } from '@/data/requests/transactions'
import { ManagerCategoryCard } from './-components/manager-category-card'
import { ManagerRecurringTransactionTable } from './-components/manager-recurring-transaction-table'

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

  const transactions = [] as TransactionType[]

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
                <h2 className="font-semibold text-lg text-foreground leading-none text-balance">
                  Lembretes de faturas recorrentes
                </h2>
              </div>

              <p className="font-normal text-base text-muted-foreground text-balance">
                Crie gastos com recorrências semanais, mensais e anuais para
                nunca se esquecer de pagar.
              </p>
            </div>

            {/* BUTTON ACTION */}
            <div className="flex flex-col gap-2">
              <Button className="w-fit" variant="gradient" disabled>
                <PlusIcon />
                Criar lembrete
              </Button>

              <span className="font-normal text-sm text-muted-foreground">
                Recorrências criadas: 0/10
              </span>
            </div>
          </div>

          {/* TABLE */}
          <div className="col-span-2 col-start-2 border border-primary/25 rounded-md overflow-hidden">
            <ManagerRecurringTransactionTable transactions={transactions} />
          </div>
        </Card>

        <Card className="w-full flex-auto grid grid-cols-3 gap-6 py-6 px-6">
          <div className="flex flex-col gap-4 col-span-1 col-start-1">
            {/* TITLE */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-start items-center gap-2">
                <CalendarIcon
                  className="size-4 shrink-0 text-foreground"
                  strokeWidth={2}
                />
                <h2 className="font-semibold text-lg text-foreground text-balance leading-none">
                  Categorias
                </h2>
              </div>

              <p className="font-normal text-base text-muted-foreground text-balance">
                Crie categorias personalizadas para todos os seus tipos de
                gastos.
              </p>
            </div>

            {/* BUTTON ACTION */}
            <div className="flex flex-col gap-2">
              <Button className="w-fit" variant="gradient" disabled>
                <PlusIcon />
                Criar categoria
              </Button>

              <span className="font-normal text-sm text-muted-foreground">
                Categorias criadas: 13/13
              </span>
            </div>
          </div>

          {/* GRID */}
          <ul className="grid grid-cols-3 gap-2 col-span-2 col-start-2">
            {TRANSACTION_CATEGORY_TYPE_VALUES.map(category => (
              <li key={category}>
                <ManagerCategoryCard category={category} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Container>
  )
}
