import { createFileRoute } from '@tanstack/react-router'
import { ChevronLeftIcon, PlusIcon } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { TitleIconPage } from '@/components/layout/title-icon-page'
import { TitlePage } from '@/components/layout/title-page'
import { Button } from '@/components/ui/button'
import { transactionResponse } from '@/data/requests/transactions'
import { listTransactionSchema } from '@/schemas/pagination'
import { Pagination } from '../../-components/pagination'
import { TransactionSearchFilterForm } from './-components/search-filter-form'
import { TransactionTable } from './-components/transaction-table'

export const Route = createFileRoute(
  '/(private)/app/$workspaceId/transaction/'
)({
  component: TransactionPage,
  validateSearch: listTransactionSchema,
  head: () => ({
    meta: [
      {
        title: 'Transações | Luna',
      },
    ],
  }),
})

function TransactionPage() {
  const { workspaceId } = Route.useParams()
  const router = Route.useNavigate()

  const {
    data: transactions,
    currentPage,
    limit,
    totalCount,
    totalPages,
  } = transactionResponse.body

  // const transactions = [] as TransactionType[]

  const handleNavigateBack = () => {
    router({
      to: '/app/$workspaceId',
      params: { workspaceId: workspaceId },
    })
  }

  return (
    <Container className="gap-6 py-6">
      {/* TITLE */}
      <div className="flex items-center gap-2">
        <TitleIconPage handleNavigateBack={handleNavigateBack}>
          <ChevronLeftIcon />
        </TitleIconPage>
        <TitlePage>Transações</TitlePage>
      </div>

      {/* FILTER */}
      <div className="flex justify-between items-center gap-6">
        <div className="max-w-2xs w-full">
          <TransactionSearchFilterForm />
        </div>

        <Button variant="gradient">
          <PlusIcon className="size-5 shrink-0 text-foreground" />
          <span>Adicionar Transação</span>
        </Button>
      </div>

      {/* TRANSACTION TABLE */}
      <div className="flex flex-auto flex-col gap-6">
        <TransactionTable transactions={transactions} />
      </div>

      {transactions && (
        <Pagination
          currentPage={currentPage}
          limit={limit}
          totalCount={totalCount}
          totalPages={totalPages}
        />
      )}
    </Container>
  )
}
