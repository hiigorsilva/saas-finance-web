import { zodResolver } from '@hookform/resolvers/zod'
import { formatDate, isValid, parseISO } from 'date-fns'
import { Settings2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { SearchInput } from '@/components/ui/search-input'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import {
  type TransactionFilterType,
  transactionFilterSchema,
} from '@/schemas/transaction-filter-form'
import type { TransactionListFilters } from '@/services/transaction/transaction'
import { validateSearchTerm } from '@/utils/search'
import { DrawerFilterTransaction } from './transaction-filter-form-drawer'

type AppliedFilterFields = Omit<TransactionListFilters, 'search'>

type TransactionFilterFormProps = {
  searchValue?: string
  filters: AppliedFilterFields
  hasAppliedFilters: boolean
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
  type: filters?.type,
  category: filters?.category,
  paymentMethod: filters?.paymentMethod,
  dateCreatedAt: {
    from: parseDateParam(filters?.startDate),
    to: parseDateParam(filters?.endDate),
  },
})

export function TransactionFilterForm({
  searchValue,
  filters,
  hasAppliedFilters,
  onApplySearch,
  onApplyFilters,
}: TransactionFilterFormProps) {
  const [isOpenDrawerFilter, setIsOpenDrawerFilter] = useState(false)

  const form = useForm<TransactionFilterType>({
    resolver: zodResolver(transactionFilterSchema),
    defaultValues: defaultValuesTransactionFilters(searchValue, filters),
  })
  const searchFieldValue = useWatch({
    control: form.control,
    name: 'search',
  })
  const debouncedSearchValue = useDebouncedValue(searchFieldValue, 500)

  useEffect(() => {
    form.reset(defaultValuesTransactionFilters(searchValue, filters))
  }, [filters, form, searchValue])

  useEffect(() => {
    const nextSearchValue = validateSearchTerm(debouncedSearchValue)
    const currentSearchValue = validateSearchTerm(searchValue)

    if (nextSearchValue === currentSearchValue) return

    onApplySearch(nextSearchValue)
  }, [debouncedSearchValue, onApplySearch, searchValue])

  const handleApplyFilters = form.handleSubmit(data => {
    onApplyFilters({
      type: data.type,
      category: data.category,
      paymentMethod: data.paymentMethod,
      startDate:
        data.dateCreatedAt?.from &&
        formatDate(data.dateCreatedAt.from, 'yyyy-MM-dd'),
      endDate:
        data.dateCreatedAt?.to &&
        formatDate(data.dateCreatedAt.to, 'yyyy-MM-dd'),
    })

    setIsOpenDrawerFilter(false)
  })

  function handleResetFilters() {
    const currentSearch = form.getValues('search')

    form.reset(defaultValuesTransactionFilters(currentSearch, undefined))

    onApplyFilters({
      type: undefined,
      category: undefined,
      paymentMethod: undefined,
      startDate: undefined,
      endDate: undefined,
    })

    setIsOpenDrawerFilter(false)
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={event => event.preventDefault()}
          className="flex items-center gap-6"
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <SearchInput
                label="Buscar Transações"
                placeholder="Buscar Transações..."
                value={field.value ?? ''}
                onValueChange={field.onChange}
              />
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
              className="relative font-normal gap-2"
              onClick={() => setIsOpenDrawerFilter(true)}
            >
              Filtros
              <Settings2Icon strokeWidth={1.4} />
              {hasAppliedFilters && (
                <div className="absolute size-2.5 -top-1 -right-1 rounded-full bg-primary" />
              )}
            </Button>
          </DrawerFilterTransaction>
        </form>
      </Form>
    </FormProvider>
  )
}
