import z from 'zod'
import { FINANCIAL_PROFILE_TYPE } from '@/data/labels/financial-profile'

export const userFinancialProfileSchema = z.object({
  financialProfile: z.enum(FINANCIAL_PROFILE_TYPE).nullable(),
})

export type UserFinancialProfileType = z.infer<
  typeof userFinancialProfileSchema
>
