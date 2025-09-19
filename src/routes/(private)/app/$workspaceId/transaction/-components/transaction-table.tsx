import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { TransactionType } from '@/data/requests/transactions'
import { TransactionTableEmpty } from './transaction-table-empty'
import { TransactionTableRow } from './transaction-table-row'

type TransactionTableProps = {
  transactions: TransactionType[]
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="flex flex-auto flex-col border border-primary/20 rounded-lg overflow-hidden">
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

        <TableBody>
          {transactions.length > 0 &&
            transactions.map(transaction => (
              <TransactionTableRow
                key={transaction.id}
                transaction={transaction}
              />
            ))}
        </TableBody>
      </Table>

      {transactions.length === 0 && (
        <div className="w-full flex flex-auto justify-center items-center">
          <TransactionTableEmpty>
            Nenhuma transação registrada.{' '}
            <span className="inline-block">
              Crie a primeira transação deste mês.
            </span>
          </TransactionTableEmpty>
        </div>
      )}
    </div>
  )
}
