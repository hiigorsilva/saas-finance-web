import z from 'zod'

export const profileUserEditSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.email({ error: 'Email inválido' }),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
  birthDate: z.date().optional(),
})

export type ProfileUserEditType = z.infer<typeof profileUserEditSchema>
