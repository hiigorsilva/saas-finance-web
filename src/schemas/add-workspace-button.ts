import z from 'zod'

export const addWorkspaceFormSchema = z.object({
  name: z
    .string({ error: 'Nome é obrigatório' })
    .min(2, 'Nome deve conter no mínimo 2 caracteres'),
  description: z.string().max(100, 'Você excedeu a quantidade de caracteres'),
  type: z.enum(['PRIVATE', 'SHARED'], { error: 'Tipo é obrigatório' }),
})
export type AddWorkspaceFormType = z.infer<typeof addWorkspaceFormSchema>
