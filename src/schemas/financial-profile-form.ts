import z from 'zod'

export const financialProfileAnswerSchema = z.object({
  stepOne: z.string().min(1, 'Por favor, selecione uma opção'),
  stepTwo: z.string().min(1, 'Por favor, selecione uma opção'),
  stepThree: z.string().min(1, 'Por favor, selecione uma opção'),
  stepFour: z.string().min(1, 'Por favor, selecione uma opção'),
})
export type FinancialProfileAnswerType = z.infer<
  typeof financialProfileAnswerSchema
>
