import z from 'zod'

export const workspaceSearchFilterSchema = z.object({
  searchWorkspace: z.string().min(3, 'Você deve digitar ao menos 3 caracteres'),
  typeWorkspace: z.enum(['all', 'private', 'shared'], {
    error: 'Tipo de workspace inválido',
  }),
})
export type WorkspaceSearchFilterType = z.infer<
  typeof workspaceSearchFilterSchema
>
