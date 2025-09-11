import z from 'zod'

export const registerFormSchema = z.object({
  name: z.string().min(1, { error: 'Nome é obrigatório' }),
  email: z.email({ error: 'Email inválido' }),
  password: z
    .string()
    .min(8, { error: 'Senha deve ter no mínimo 8 caracteres' }),
})

export type RegisterFormType = z.infer<typeof registerFormSchema>
