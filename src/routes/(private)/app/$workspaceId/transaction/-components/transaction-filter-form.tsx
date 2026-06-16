import { zodResolver } from '@hookform/resolvers/zod'
import { formatDate } from 'date-fns'
import { SearchIcon, Settings2Icon } from 'lucide-react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  type TransactionFilterType,
  transactionFilterSchema,
} from '@/schemas/transaction-filter-form'
import { DrawerFilterTransaction } from './transaction-filter-form-drawer'

export const defaultValuesTransactionFilters = (): TransactionFilterType => ({
  search: undefined,
  typeExpense: undefined,
  typeCategory: undefined,
  typePaymentMethod: undefined,
  dateCreatedAt: {
    from: undefined,
    to: undefined,
  },
})

export function TransactionFilterForm() {
  const [isOpenDrawerFilter, setIsOpenDrawerFilter] = useState(false)

  const form = useForm<TransactionFilterType>({
    resolver: zodResolver(transactionFilterSchema),
    defaultValues: defaultValuesTransactionFilters(),
  })

  async function onSubmit(data: TransactionFilterType) {
    try {
      const dataFormatted = {
        dateCreatedAt: {
          from:
            data.dateCreatedAt?.from &&
            formatDate(data.dateCreatedAt.from, 'yyyy-MM-dd'),
          to:
            data.dateCreatedAt?.to &&
            formatDate(data.dateCreatedAt.to, 'yyyy-MM-dd'),
        },
        search: data.search,
        typeExpense: data.typeExpense,
        typeCategory: data.typeCategory,
      }

      console.log('Filtro:', dataFormatted)
    } catch (error) {
      toast.error('Erro ao filtrar transações.')
      console.error('TRANSACTION_FILTER_ERROR:', error)
    } finally {
      setIsOpenDrawerFilter(false)
    }
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-6"
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="relative flex flex-col gap-0 min-w-52 w-fit">
                <FormLabel className="sr-only">Buscar Transações</FormLabel>
                <FormControl>
                  <div className="flex items-center border rounded-md px-3 has-[input:focus-within]:border-ring has-[input:focus-within]:ring-ring/50 has-[input:focus-within]:ring-2">
                    <Input
                      className="pl-0 pr-3 shadow-none border-0 focus-visible:border-0 focus-visible:ring-0"
                      placeholder="Buscar Transações..."
                      autoComplete="off"
                      {...field}
                    />
                    <SearchIcon
                      className="size-5 text-muted-foreground"
                      strokeWidth={1}
                    />
                  </div>
                </FormControl>
                <FormMessage className="" />
              </FormItem>
            )}
          />

          <DrawerFilterTransaction
            form={form}
            isOpen={isOpenDrawerFilter}
            onOpenChange={setIsOpenDrawerFilter}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Button
              variant="outline"
              type="button"
              className="font-normal"
              onClick={() => setIsOpenDrawerFilter(true)}
            >
              Filtros
              <Settings2Icon strokeWidth={1.4} />
            </Button>
          </DrawerFilterTransaction>
        </form>
      </Form>
    </FormProvider>
  )
}
