import z from 'zod'

export const loginFormSchema = z.object({
  email: z.email({ error: 'Email inválido' }),
  password: z
    .string()
    .min(8, { error: 'Senha deve ter no mínimo 8 caracteres' }),
})

export type LoginFormType = z.infer<typeof loginFormSchema>
