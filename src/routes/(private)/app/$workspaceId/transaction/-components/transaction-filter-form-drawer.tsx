import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import type { DateRange } from 'react-day-picker'
import { type useForm, useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import type { TransactionFilterType } from '@/schemas/transaction-filter-form'
import {
  optionsTransactionCategory,
  optionsTransactionPaymentMethod,
  optionsTypeTransaction,
} from '../../../-data/options-select'
import { defaultValuesTransactionFilters } from './transaction-filter-form'

type DrawerFilterTransactionProps = {
  children: ReactNode
  form: ReturnType<typeof useForm<TransactionFilterType>>
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: () => void
}

export function DrawerFilterTransaction({
  children,
  isOpen,
  onOpenChange,
  onSubmit,
}: DrawerFilterTransactionProps) {
  const form = useFormContext<TransactionFilterType>()

  async function handleSubmitChildren() {
    onSubmit()
    onOpenChange(false)
    form.reset(defaultValuesTransactionFilters())
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange} direction="right">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="gap-6">
        <DrawerHeader className="pb-0">
          <DrawerTitle>Filtros</DrawerTitle>
          <DrawerDescription>
            Filtre as transações pelos campos desejados.
          </DrawerDescription>
        </DrawerHeader>

        <Separator />

        <div className="flex flex-col gap-6 px-4">
          <FormField
            control={form.control}
            name="typeExpense"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tipo de Transação</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecionar transação" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {optionsTypeTransaction.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="typeCategory"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tipo de Categoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecionar categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {optionsTransactionCategory.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="typePaymentMethod"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tipo de Pagamento</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecionar pagamento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {optionsTransactionPaymentMethod.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateCreatedAt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-semibold">
                  Período da Transação
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-between font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, 'dd/MM/yyyy', {
                                locale: ptBR,
                              })}{' '}
                              -{' '}
                              {format(field.value.to, 'dd/MM/yyyy', {
                                locale: ptBR,
                              })}
                            </>
                          ) : (
                            format(field.value.from, 'dd/MM/yyyy', {
                              locale: ptBR,
                            })
                          )
                        ) : (
                          <span>Selecionar intervalo</span>
                        )}
                        <CalendarIcon className="h-4 w-4" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={field.value as DateRange}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                      locale={ptBR}
                      className="capitalize"
                      captionLayout="dropdown-years"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DrawerFooter>
          <Button type="button" onClick={handleSubmitChildren}>
            Filtrar
          </Button>

          <div className="w-full flex justify-between items-center gap-1">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset(defaultValuesTransactionFilters())
              }}
              className="w-full flex-1"
            >
              Resetar Filtros
            </Button>
            <DrawerClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full flex-1"
              >
                Cancelar
              </Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
