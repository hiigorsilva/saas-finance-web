import z from 'zod'
import { TRANSACTION_CATEGORY_TYPE_VALUES } from '@/data/labels/transaction-category'
import { TRANSACTION_PAYMENT_METHOD_TYPE_VALUES } from '@/data/labels/transaction-payment-method'
import { TRANSACTION_TYPE_VALUES } from '@/data/labels/transaction-type'

export const addTransactionSchema = z.object({
  workspaceId: z.string(),
  name: z.string().trim().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  description: z.string().trim().optional(),
  type: z.enum(TRANSACTION_TYPE_VALUES),
  category: z.enum(TRANSACTION_CATEGORY_TYPE_VALUES),
  amount: z.string().trim(),
  paymentDate: z.date(),
  paymentMethod: z.enum(TRANSACTION_PAYMENT_METHOD_TYPE_VALUES),
})

export type AddTransactionType = z.infer<typeof addTransactionSchema>
