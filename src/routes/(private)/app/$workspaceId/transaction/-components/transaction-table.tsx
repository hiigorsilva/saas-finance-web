import { StickyNoteIcon } from 'lucide-react'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { ITransaction } from '@/services/transaction/transaction.d'
import { TransactionTableRow } from './transaction-table-row'

type TransactionTableProps = {
  transactions: ITransaction[]
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="flex flex-col flex-1 border border-primary/10 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary/10">
            <TableHead>Nome</TableHead>
            <TableHead className="w-40 font-semibold">Valor</TableHead>
            <TableHead className="w-40 font-semibold">Tipo</TableHead>
            <TableHead className="w-48 font-semibold">Categoria</TableHead>
            <TableHead className="w-40 font-semibold">Pagamento</TableHead>
            <TableHead className="w-32 font-semibold">Data</TableHead>
            <TableHead className="w-28 font-semibold text-center">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>

        {transactions.length > 0 && (
          <TableBody>
            {transactions.map(transaction => (
              <TransactionTableRow
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </TableBody>
        )}
      </Table>
      {transactions.length === 0 && (
        <div className="flex flex-col flex-1 justify-center items-center gap-3">
          <p className="text-sm leading-none text-center text-muted-foreground">
            <Empty>
              <EmptyHeader className="gap-0">
                <EmptyMedia variant="icon">
                  <StickyNoteIcon className="size-5 shrink-0 text-muted-foreground" />
                </EmptyMedia>
                <EmptyTitle>Nenhuma transação encontrada.</EmptyTitle>
              </EmptyHeader>
              <EmptyDescription>
                Clique no botão "Nova Transação" para registrar suas despesas e
                receitas.
              </EmptyDescription>
            </Empty>
          </p>
        </div>
      )}
    </div>
  )
}
