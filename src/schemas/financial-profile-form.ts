import z from 'zod'

export const financialProfileAnswerSchema = z.object({
  stepOne: z.string(),
  stepTwo: z.string(),
  stepThree: z.string(),
  stepFour: z.string(),
})
export type FinancialProfileAnswerType = z.infer<
  typeof financialProfileAnswerSchema
>
