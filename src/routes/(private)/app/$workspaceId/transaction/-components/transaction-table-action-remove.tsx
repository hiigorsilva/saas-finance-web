import { Loader2Icon } from 'lucide-react'
import { type ComponentProps, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { TransactionType } from '@/data/requests/transactions'
import { TransactionService } from '@/services/transaction/transaction'

type TransactionTableActionRemoveProps = ComponentProps<'button'> & {
  transaction: TransactionType
  onFetchData: () => Promise<void>
}

export function TransactionTableActionRemove({
  transaction,
  children,
  onFetchData,
}: TransactionTableActionRemoveProps) {
  const [openModal, setOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCancelDialog = () => {
    setOpenModal(prevState => !prevState)
  }

  const handleRemoveTransaction = async (id: string) => {
    setIsLoading(true)
    try {
      const res = await TransactionService.DeleteTransaction(
        transaction.workspaceId,
        id
      )
      if (res.status === 200 || res.status === 204) {
        toast.success('Transação removida com sucesso!')
        await onFetchData()
      }
    } catch (_error) {
      toast.error('Erro ao remover transação. Tente novamente mais tarde.')
    } finally {
      setIsLoading(false)
      setOpenModal(prevState => !prevState)
    }
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-h-[80dvh] h-fit overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            Remover transação |{' '}
            <span className="text-muted-foreground">{transaction.name}</span>
          </DialogTitle>
          <DialogDescription className="text-center text-pretty">
            Você tem certeza que deseja remover esta transação? Essa ação é
            irreversível.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-between items-center gap-3">
          <Button
            className="flex-1"
            type="button"
            variant="outline"
            onClick={handleCancelDialog}
          >
            Cancelar
          </Button>

          <Button
            className="flex-1"
            type="button"
            variant="gradient"
            disabled={isLoading}
            onClick={() => handleRemoveTransaction(transaction.id)}
          >
            {!isLoading && 'Remover transação'}
            {isLoading && (
              <Loader2Icon className="size-4 shrink-0 text-foreground animate-spin" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
