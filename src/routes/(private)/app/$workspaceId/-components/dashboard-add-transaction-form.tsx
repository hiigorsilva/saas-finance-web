import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { ptBR } from 'react-day-picker/locale'
import type { UseFormReturn } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { v4 as uuidV4 } from 'uuid'
import type { CreateTransactionType } from '@/@types/transaction/create-transaction'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { TRANSACTION_RECURRING_INTERVAL_TYPE_VALUES } from '@/data/labels/transaction-recurring-interval'
import { TRANSACTION_TYPE_VALUES } from '@/data/labels/transaction-type'
import { cn } from '@/lib/utils'
import type { AddTransactionType } from '@/schemas/add-transaction-button'
import { dateFormatLong } from '@/utils/date-format'
import {
  transactionCategoryTranslate,
  transactionPaymentMethodTranslate,
  transactionRecurringIntervalTranslate,
  transactionTypeTranslate,
} from '../-utils/transactions'

type AddTransactionFormProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  form: UseFormReturn<CreateTransactionType>
}

export function AddTransactionForm({
  setOpenModal,
  form,
}: AddTransactionFormProps) {
  const [isRecurring, setIsRecurring] = useState(false)

  const onSubmit = (data: AddTransactionType) => {
    console.log('TRANSACTION_CREATED', data)
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

        <div className="flex justify-between items-center gap-6">
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

          {/* IS RECURRING */}
          <FormField
            control={form.control}
            name="isRecurring"
            render={({ field }) => (
              <FormItem className="relative w-full">
                <FormLabel className="font-semibold">É parcelado? *</FormLabel>
                <FormControl>
                  <div className="relative w-full h-10 flex justify-start items-center gap-2 border rounded-md px-1">
                    <Checkbox
                      className="sr-only"
                      id={field.name}
                      defaultChecked={field.value}
                      onCheckedChange={checked => {
                        field.onChange(checked)
                        setIsRecurring(prevState => !prevState)
                      }}
                    />

                    <div
                      className={`absolute ${isRecurring ? 'left-1' : 'right-1'} transition-all z-30 w-1/2 h-7 border border-primary/75 rounded-sm bg-primary/50`}
                    />

                    <Label
                      htmlFor={field.name}
                      className="relative z-50 w-full h-8 flex justify-center items-center font-normal px-4 cursor-pointer"
                    >
                      Sim
                    </Label>
                    <Label
                      htmlFor={field.name}
                      className="relative z-50 w-full h-8 flex justify-center items-center font-normal px-4 cursor-pointer"
                    >
                      Não
                    </Label>
                  </div>
                </FormControl>
                <FormMessage className="absolute -bottom-5 left-0" />
              </FormItem>
            )}
          />
        </div>

        {isRecurring && (
          <>
            <div className="flex justify-between items-center gap-6">
              {/* RECURRING INTERVAL */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="relative w-full">
                    <FormLabel className="font-semibold">
                      Intervalo da parcela *
                    </FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="max-w-72 w-full min-h-10">
                          <SelectValue
                            {...field}
                            placeholder="Selecione o intervalo"
                          />
                        </SelectTrigger>

                        <SelectContent>
                          {TRANSACTION_RECURRING_INTERVAL_TYPE_VALUES.map(
                            recurring => (
                              <SelectItem key={recurring} value={recurring}>
                                {transactionRecurringIntervalTranslate(
                                  recurring
                                )}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
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
                      Data da última parcela *
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

            <div className="flex justify-between items-center gap-6">
              {/* CURRENT RECURRING */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="relative w-full">
                    <FormLabel className="font-semibold">
                      Parcela atual *
                    </FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="max-w-72 w-full min-h-10">
                          <SelectValue
                            {...field}
                            placeholder="Selecione a atual"
                          />
                        </SelectTrigger>

                        <SelectContent>
                          {Array.from({ length: 12 }).map((_, index) => {
                            const id = uuidV4()
                            const numberRecurring = index + 1

                            return (
                              <SelectItem
                                key={id}
                                value={String(numberRecurring)}
                              >
                                {numberRecurring}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="absolute -bottom-5 left-0" />
                  </FormItem>
                )}
              />

              {/* TOTAL RECURRING */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="relative w-full">
                    <FormLabel className="font-semibold">
                      Total de parcelas *
                    </FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="max-w-72 w-full min-h-10">
                          <SelectValue
                            {...field}
                            placeholder="Selecione o total"
                          />
                        </SelectTrigger>

                        <SelectContent>
                          {Array.from({ length: 12 }).map((_, index) => {
                            const id = uuidV4()
                            return (
                              <SelectItem key={id} value={String(index + 1)}>
                                {index + 1}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="absolute -bottom-5 left-0" />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

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

          <Button className="flex-1" type="submit" variant="gradient">
            Criar Workspace
          </Button>
        </div>
      </form>
    </Form>
  )
}
