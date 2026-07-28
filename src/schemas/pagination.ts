import z from 'zod'
import { TRANSACTION_CATEGORY_TYPE_VALUES } from '@/data/labels/transaction-category'
import { TRANSACTION_PAYMENT_METHOD_TYPE_VALUES } from '@/data/labels/transaction-payment-method'
import { TRANSACTION_TYPE_VALUES } from '@/data/labels/transaction-type'

const dateYmdRegex = /^\d{4}-\d{2}-\d{2}$/

export const listTransactionSchema = z
  .object({
    page: z.coerce.number().positive().default(1),
    limit: z.coerce.number().positive().max(100).default(50),
    search: z
      .string()
      .trim()
      .transform(value => value || undefined)
      .optional(),
    typeExpense: z.enum(TRANSACTION_TYPE_VALUES).optional(),
    typeCategory: z.enum(TRANSACTION_CATEGORY_TYPE_VALUES).optional(),
    typePaymentMethod: z
      .enum(TRANSACTION_PAYMENT_METHOD_TYPE_VALUES)
      .optional(),
    from: z.string().regex(dateYmdRegex).optional(),
    to: z.string().regex(dateYmdRegex).optional(),
  })
  .refine(data => Boolean(data.from) === Boolean(data.to), {
    message: 'from e to devem ser informados juntos',
  })

export type ListTransactionSearchType = z.infer<typeof listTransactionSchema>
