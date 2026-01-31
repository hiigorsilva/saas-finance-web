import z from 'zod'
import { TRANSACTION_CATEGORY_TYPE_VALUES } from '@/data/labels/transaction-category'
import { TRANSACTION_PAYMENT_METHOD_TYPE_VALUES } from '@/data/labels/transaction-payment-method'
import { TRANSACTION_TYPE_VALUES } from '@/data/labels/transaction-type'

export const transactionFilterSchema = z.object({
  search: z.string().optional(),
  typeExpense: z.enum(TRANSACTION_TYPE_VALUES).optional(),
  typeCategory: z.enum(TRANSACTION_CATEGORY_TYPE_VALUES).optional(),
  typePaymentMethod: z.enum(TRANSACTION_PAYMENT_METHOD_TYPE_VALUES).optional(),
  dateCreatedAt: z.object(
    {
      from: z
        .date({
          error: 'Selecione a data inicial',
        })
        .optional(),
      to: z
        .date({
          error: 'Selecione a data final',
        })
        .optional(),
    },
    {
      error: 'Selecione um intervalo de datas',
    }
  ),
})
export type TransactionFilterType = z.infer<typeof transactionFilterSchema>
