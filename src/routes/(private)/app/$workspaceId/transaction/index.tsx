import { createFileRoute } from '@tanstack/react-router'
import { ChevronLeftIcon, PlusIcon } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { Container } from '@/components/layout/container'
import { TitleIconPage } from '@/components/layout/title-icon-page'
import { TitlePage } from '@/components/layout/title-page'
import { Button } from '@/components/ui/button'
import { useTransactionsQuery } from '@/hooks/queries/use-transactions-query'
import { listTransactionSchema } from '@/schemas/pagination'
import { normalizeApiError } from '@/services/api/errors'
import { Pagination } from '../../-components/pagination'
import { DashboardAddTransactionButton } from '../-components/dashboard-add-transaction-button'
import { TransactionFilterForm } from './-components/transaction-filter-form'
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

  const { data, error } = useTransactionsQuery(workspaceId, 1, 50)

  const transactions = data ?? {
    data: [],
    props: {
      currentPage: 1,
      limit: 10,
      totalCount: 0,
      totalPages: 0,
    },
  }

  const handleNavigateBack = () => {
    router({
      to: '/app/$workspaceId',
      params: { workspaceId: workspaceId },
    })
  }

  useEffect(() => {
    if (!error) return

    const apiError = normalizeApiError(error)
    toast.error(apiError.message)
  }, [error])

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
          <TransactionFilterForm />
        </div>

        <DashboardAddTransactionButton>
          <Button variant="gradient">
            <PlusIcon className="size-5 shrink-0 text-foreground" />
            <span>Nova Transação</span>
          </Button>
        </DashboardAddTransactionButton>
      </div>

      {/* TRANSACTION TABLE */}
      <div className="flex flex-col gap-6">
        <TransactionTable transactions={transactions.data} />
      </div>

      {transactions && (
        <Pagination
          currentPage={transactions.props.currentPage}
          limit={transactions.props.limit}
          totalCount={transactions.props.totalCount}
          totalPages={transactions.props.totalPages}
        />
      )}
    </Container>
  )
}
