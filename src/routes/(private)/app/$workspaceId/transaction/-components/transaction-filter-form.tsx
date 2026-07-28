import { zodResolver } from '@hookform/resolvers/zod'
import { formatDate, isValid, parseISO } from 'date-fns'
import { SearchIcon, Settings2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
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
import type { TransactionListFilters } from '@/services/transaction/transaction'
import { DrawerFilterTransaction } from './transaction-filter-form-drawer'

type AppliedFilterFields = Omit<TransactionListFilters, 'search'>

type TransactionFilterFormProps = {
  searchValue?: string
  filters: AppliedFilterFields
  onApplySearch: (search?: string) => void
  onApplyFilters: (filters: AppliedFilterFields) => void
}

function parseDateParam(value?: string) {
  if (!value) return undefined

  const parsedDate = parseISO(value)
  return isValid(parsedDate) ? parsedDate : undefined
}

export const defaultValuesTransactionFilters = (
  search?: string,
  filters?: AppliedFilterFields
): TransactionFilterType => ({
  search,
  typeExpense: filters?.typeExpense,
  typeCategory: filters?.typeCategory,
  typePaymentMethod: filters?.typePaymentMethod,
  dateCreatedAt: {
    from: parseDateParam(filters?.from),
    to: parseDateParam(filters?.to),
  },
})

export function TransactionFilterForm({
  searchValue,
  filters,
  onApplySearch,
  onApplyFilters,
}: TransactionFilterFormProps) {
  const [isOpenDrawerFilter, setIsOpenDrawerFilter] = useState(false)

  const form = useForm<TransactionFilterType>({
    resolver: zodResolver(transactionFilterSchema),
    defaultValues: defaultValuesTransactionFilters(searchValue, filters),
  })

  useEffect(() => {
    form.reset(defaultValuesTransactionFilters(searchValue, filters))
  }, [filters, form, searchValue])

  function handleSearchSubmit() {
    const nextSearch = form.getValues('search')?.trim()
    onApplySearch(nextSearch || undefined)
  }

  const handleApplyFilters = form.handleSubmit(data => {
    onApplyFilters({
      typeExpense: data.typeExpense,
      typeCategory: data.typeCategory,
      typePaymentMethod: data.typePaymentMethod,
      from:
        data.dateCreatedAt?.from &&
        formatDate(data.dateCreatedAt.from, 'yyyy-MM-dd'),
      to:
        data.dateCreatedAt?.to &&
        formatDate(data.dateCreatedAt.to, 'yyyy-MM-dd'),
    })

    setIsOpenDrawerFilter(false)
  })

  function handleResetFilters() {
    const currentSearch = form.getValues('search')

    form.reset(defaultValuesTransactionFilters(currentSearch, undefined))

    onApplyFilters({
      typeExpense: undefined,
      typeCategory: undefined,
      typePaymentMethod: undefined,
      from: undefined,
      to: undefined,
    })

    setIsOpenDrawerFilter(false)
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={event => {
            event.preventDefault()
            handleSearchSubmit()
          }}
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
            isOpen={isOpenDrawerFilter}
            onOpenChange={setIsOpenDrawerFilter}
            onSubmitFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
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
