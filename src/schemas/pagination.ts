import z from 'zod'
import { TRANSACTION_CATEGORY_TYPE_VALUES } from '@/data/labels/transaction-category'
import { TRANSACTION_PAYMENT_METHOD_TYPE_VALUES } from '@/data/labels/transaction-payment-method'
import { TRANSACTION_TYPE_VALUES } from '@/data/labels/transaction-type'

const dateYmdRegex = /^\d{4}-\d{2}-\d{2}$/

const normalizeSearchParam = z.preprocess(value => {
  if (typeof value !== 'string') return undefined

  const normalized = value.trim()
  return normalized.length ? normalized : undefined
}, z.string().optional().catch(undefined))

const normalizeEnumTypeExpense = z.preprocess(value => {
  if (typeof value !== 'string') return undefined

  const normalized = value.trim().toUpperCase()
  return normalized.length ? normalized : undefined
}, z.enum(TRANSACTION_TYPE_VALUES).optional().catch(undefined))

const normalizeEnumTypeCategory = z.preprocess(value => {
  if (typeof value !== 'string') return undefined

  const normalized = value.trim().toUpperCase()
  return normalized.length ? normalized : undefined
}, z.enum(TRANSACTION_CATEGORY_TYPE_VALUES).optional().catch(undefined))

const normalizeEnumTypePaymentMethod = z.preprocess(value => {
  if (typeof value !== 'string') return undefined

  const normalized = value.trim().toUpperCase()
  return normalized.length ? normalized : undefined
}, z.enum(TRANSACTION_PAYMENT_METHOD_TYPE_VALUES).optional().catch(undefined))

const normalizeDateParam = z.preprocess(value => {
  if (typeof value !== 'string') return undefined

  const normalized = value.trim()
  return normalized.length ? normalized : undefined
}, z.string().regex(dateYmdRegex).optional().catch(undefined))

export const listTransactionSchema = z
  .object({
    page: z.coerce.number().int().positive().catch(1).default(1),
    limit: z.coerce.number().int().positive().max(100).catch(50).default(50),
    search: normalizeSearchParam,
    typeExpense: normalizeEnumTypeExpense,
    typeCategory: normalizeEnumTypeCategory,
    typePaymentMethod: normalizeEnumTypePaymentMethod,
    from: normalizeDateParam,
    to: normalizeDateParam,
  })
  .transform(data => {
    const hasRange = Boolean(data.from && data.to)

    return {
      ...data,
      from: hasRange ? data.from : undefined,
      to: hasRange ? data.to : undefined,
    }
  })

export type ListTransactionSearchType = z.infer<typeof listTransactionSchema>
