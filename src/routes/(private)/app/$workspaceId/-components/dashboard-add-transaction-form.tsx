import { useParams } from '@tanstack/react-router'
import { CalendarIcon, Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { ptBR } from 'react-day-picker/locale'
import type { UseFormReturn } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { toast } from 'sonner'
import type { CreateTransactionType } from '@/@types/transaction/create-transaction'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { TRANSACTION_CATEGORY_TYPE_VALUES } from '@/data/labels/transaction-category'
import { TRANSACTION_PAYMENT_METHOD_TYPE_VALUES } from '@/data/labels/transaction-payment-method'
import { TRANSACTION_TYPE_VALUES } from '@/data/labels/transaction-type'
import { cn } from '@/lib/utils'
import type { AddTransactionType } from '@/schemas/add-transaction-button'
import { TransactionService } from '@/services/transaction/transaction'
import { dateFormatLong } from '@/utils/date-format'
import {
  transactionCategoryTranslate,
  transactionPaymentMethodTranslate,
  transactionTypeTranslate,
} from '../-utils/transactions'

type AddTransactionFormProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  form: UseFormReturn<CreateTransactionType>
  onFetchData: () => Promise<void>
}

export function AddTransactionForm({
  setOpenModal,
  form,
  onFetchData,
}: AddTransactionFormProps) {
  const { workspaceId } = useParams({ from: '/(private)/app/$workspaceId' })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: AddTransactionType) => {
    setIsLoading(true)
    try {
      const res = await TransactionService.PostTransaction(workspaceId, data)
      if (res.status === 200 || res.status === 201) {
        toast.success('Transação criada com sucesso!')
        onFetchData()
        form.reset()
        setOpenModal(false)
      }
    } catch (error) {
      console.error(error)
      toast.error('Erro ao criar transação. Por favor, tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelForm = () => {
    form.reset()
    setOpenModal(false)
  }

  const isRangeDateValid = (date: Date) => {
    return date > new Date() || date < new Date('1900-01-01')
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-auto flex-col gap-8 px-1"
      >
        {/* NAME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="font-semibold">
                Nome da Transação *
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Conta de luz"
                  autoFocus
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute -bottom-5 left-0" />
            </FormItem>
          )}
        />

        {/* DESCRIPTION */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => {
            const maxLength = 100
            const currentLength = field.value?.length ?? 0
            const isDescriptionMaxLength = currentLength > maxLength

            return (
              <FormItem className="relative">
                <FormLabel className="font-semibold">Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    className="max-w-full h-20 resize-none text-wrap pb-3"
                    placeholder="Ex: Pagamento da conta do mês de Agosto"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <div
                  className={`absolute -bottom-7 right-0 w-fit flex justify-center items-center border ${isDescriptionMaxLength && 'border-red-500'} ml-auto rounded-full px-2 py-1`}
                >
                  <span
                    className={`inline-block text-xs ${isDescriptionMaxLength ? 'text-red-500' : 'text-muted-foreground'} leading-none`}
                  >
                    {currentLength} / {maxLength}
                  </span>
                </div>
                <FormMessage className="absolute -bottom-5 left-0" />
              </FormItem>
            )
          }}
        />

        <div className="flex justify-between items-center gap-6">
          {/* TYPE */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="relative w-full">
                <FormLabel className="font-semibold">Tipo *</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="max-w-72 w-full min-h-10">
                      <SelectValue {...field} placeholder="Selecione o tipo" />
                    </SelectTrigger>

                    <SelectContent>
                      {TRANSACTION_TYPE_VALUES.map(type => (
                        <SelectItem key={type} value={type}>
                          {transactionTypeTranslate(type)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="absolute -bottom-5 left-0" />
              </FormItem>
            )}
          />

          {/* CATEGORY */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="relative w-full">
                <FormLabel className="font-semibold">Categoria *</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="max-w-72 w-full">
                      <SelectValue {...field} placeholder="Selecione o tipo" />
                    </SelectTrigger>

                    <SelectContent>
                      {TRANSACTION_CATEGORY_TYPE_VALUES.map(category => (
                        <SelectItem key={category} value={category}>
                          {transactionCategoryTranslate(category)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="absolute -bottom-5 left-0" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between items-center gap-6">
          {/* AMOUNT */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="relative w-full">
                <FormLabel className="font-semibold">Valor *</FormLabel>
                <FormControl>
                  <NumericFormat
                    customInput={Input}
                    prefix="R$ "
                    placeholder="R$ 0,00"
                    decimalScale={2}
                    thousandSeparator="."
                    decimalSeparator=","
                    fixedDecimalScale
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute -bottom-5 left-0" />
              </FormItem>
            )}
          />

          {/* PAYMENT DATE */}
          <FormField
            control={form.control}
            name="paymentDate"
            render={({ field }) => (
              <FormItem className="relative w-full">
                <FormLabel className="font-semibold">
                  Data de pagamento *
                </FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(`
                                'w-full font-normal text-foreground',
                                ${!field.value && 'text-muted-foreground'}
                              `)}
                        >
                          {field.value && dateFormatLong(field.value)}
                          {!field.value && <span>Selecionar data</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        className="capitalize"
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={date => isRangeDateValid(date)}
                        captionLayout="label"
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage className="absolute -bottom-5 left-0" />
              </FormItem>
            )}
          />
        </div>

        <div className="w-1/2 flex justify-between items-center gap-6">
          {/* PAYMENT METHOD */}
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="relative w-full">
                <FormLabel className="font-semibold">Tipo *</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={TRANSACTION_PAYMENT_METHOD_TYPE_VALUES[0]}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="max-w-72 w-full min-h-10">
                      <SelectValue
                        {...field}
                        placeholder="Selecionar método de pagamento"
                      />
                    </SelectTrigger>

                    <SelectContent>
                      {TRANSACTION_PAYMENT_METHOD_TYPE_VALUES.map(method => (
                        <SelectItem key={method} value={method}>
                          {transactionPaymentMethodTranslate(method)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="absolute -bottom-5 left-0" />
              </FormItem>
            )}
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between items-center gap-4">
          <Button
            className="flex-1"
            type="button"
            variant="outline"
            onClick={handleCancelForm}
          >
            Cancelar
          </Button>

          <Button
            className="flex-1"
            type="submit"
            variant="gradient"
            disabled={isLoading}
          >
            {isLoading && <Loader2Icon className="animate-spin" />}
            {!isLoading && 'Criar Transação'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
