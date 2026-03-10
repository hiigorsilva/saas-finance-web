import { createFileRoute } from '@tanstack/react-router'
import { ChevronLeftIcon, PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Container } from '@/components/layout/container'
import { TitleIconPage } from '@/components/layout/title-icon-page'
import { TitlePage } from '@/components/layout/title-page'
import { Button } from '@/components/ui/button'
import { listTransactionSchema } from '@/schemas/pagination'
import { TransactionService } from '@/services/transaction/transaction'
import type { ITransaction } from '@/services/transaction/transaction.d'
import type { IPaginateResponse } from '@/utils/http'
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

  const [transactions, setTransactions] = useState<
    IPaginateResponse<ITransaction>
  >({
    data: [],
    currentPage: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 0,
  })

  async function fetchData() {
    try {
      const res = await TransactionService.GetTransactions(workspaceId, 1, 50)
      if (res.status === 200 || res.status === 204) {
        const { data, currentPage, limit, totalCount, totalPages } =
          res.data.body
        setTransactions({ data, currentPage, limit, totalCount, totalPages })
      }
    } catch (_error) {
      toast.error('Erro ao carregar transações. Por favor, tente novamente.')
    }
  }

  const handleNavigateBack = () => {
    router({
      to: '/app/$workspaceId',
      params: { workspaceId: workspaceId },
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

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

        <DashboardAddTransactionButton onFetchData={fetchData}>
          <Button variant="gradient">
            <PlusIcon className="size-5 shrink-0 text-foreground" />
            <span>Nova Transação</span>
          </Button>
        </DashboardAddTransactionButton>
      </div>

      {/* TRANSACTION TABLE */}
      <div className="flex flex-col gap-6">
        <TransactionTable
          transactions={transactions.data}
          onFetchData={fetchData}
        />
      </div>

      {transactions && (
        <Pagination
          currentPage={transactions.currentPage}
          limit={transactions.limit}
          totalCount={transactions.totalCount}
          totalPages={transactions.totalPages}
        />
      )}
    </Container>
  )
}
