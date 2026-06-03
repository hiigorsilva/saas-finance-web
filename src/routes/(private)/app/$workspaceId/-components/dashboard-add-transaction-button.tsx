import { zodResolver } from '@hookform/resolvers/zod'
import { type ComponentProps, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import {
  type AddTransactionType,
  addTransactionSchema,
} from '@/schemas/add-transaction-button'
import {
  AddTransactionForm,
  defaultValuesNewTransaction,
} from './dashboard-add-transaction-form'

type AddTransactionButtonProps = ComponentProps<'button'>

export function DashboardAddTransactionButton({
  children,
}: AddTransactionButtonProps) {
  const [openModal, setOpenModal] = useState(false)

  const form = useForm<AddTransactionType>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: defaultValuesNewTransaction(),
  })

  function handleOpenChange(open: boolean) {
    if (!open) form.reset(defaultValuesNewTransaction())
    setOpenModal(open)
  }

  return (
    <Dialog open={openModal} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-h-[80dvh] h-full overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            Criar nova Transação
          </DialogTitle>
          <DialogDescription className="text-center">
            Preencha as informações abaixo.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <AddTransactionForm form={form} setOpenModal={setOpenModal} />
      </DialogContent>
    </Dialog>
  )
}
