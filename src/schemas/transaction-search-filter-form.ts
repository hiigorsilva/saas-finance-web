import z from 'zod'

export const transactionSearchFilterSchema = z.object({
  search: z.string().min(3, 'Você deve digitar ao menos 3 caracteres'),
})
export type TransactionSearchFilterType = z.infer<
  typeof transactionSearchFilterSchema
>
