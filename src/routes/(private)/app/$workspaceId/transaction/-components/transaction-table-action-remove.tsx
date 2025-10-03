import { Loader2Icon } from 'lucide-react'
import { type ComponentProps, useState } from 'react'
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

type TransactionTableActionRemoveProps = ComponentProps<'button'> & {
  transaction: TransactionType
}

export function TransactionTableActionRemove({
  transaction,
  children,
}: TransactionTableActionRemoveProps) {
  const [openModal, setOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCancelDialog = () => {
    setOpenModal(prevState => !prevState)
  }

  const handleRemoveTransaction = async (id: string) => {
    setIsLoading(true)
    console.log('TRANSACTION_REMOVED', id)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsLoading(false)
    setOpenModal(prevState => !prevState)
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger>{children}</DialogTrigger>

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
