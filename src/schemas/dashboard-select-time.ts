import z from 'zod'
import { MONTHS_OF_YEAR } from '@/data/date/month-select'

const currentDate = new Date()
const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0')

export const monthSelectSchema = z.object({
  month: z
    .enum(MONTHS_OF_YEAR.map(month => month.value))
    .optional()
    .default(currentMonth),
  year: z.string().optional().default(String(currentDate.getFullYear())),
})
