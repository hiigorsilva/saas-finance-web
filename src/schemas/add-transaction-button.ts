import z from 'zod'
import { TRANSACTION_CATEGORY_TYPE_VALUES } from '@/data/labels/transaction-category'
import { TRANSACTION_PAYMENT_METHOD_TYPE_VALUES } from '@/data/labels/transaction-payment-method'
import { TRANSACTION_TYPE_VALUES } from '@/data/labels/transaction-type'

const amountSchema = z
  .number({ error: 'Valor é obrigatório' })
  .superRefine((value, ctx) => {
    if (value < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Valor não pode ser negativo',
      })
      return
    }

    if (value === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Valor deve ser maior que zero',
      })
    }
  })

export const addTransactionSchema = z.object({
  name: z.string().trim().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  description: z.string().trim().optional(),
  type: z.enum(TRANSACTION_TYPE_VALUES, { error: 'Tipo é obrigatório' }),
  category: z.enum(TRANSACTION_CATEGORY_TYPE_VALUES, {
    error: 'Categoria é obrigatória',
  }),
  amount: amountSchema,
  paymentDate: z.date({ error: 'Data de pagamento é obrigatória' }),
  paymentMethod: z.enum(TRANSACTION_PAYMENT_METHOD_TYPE_VALUES, {
    error: 'Método de pagamento é obrigatório',
  }),
})

export type AddTransactionType = z.infer<typeof addTransactionSchema>
