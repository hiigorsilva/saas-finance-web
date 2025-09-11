import z from 'zod'

export const workspaceSearchFormSchema = z.object({
  searchWorkspace: z.string().min(3, 'Você deve digitar ao menos 3 caracteres'),
})
export type WorkspaceSearchFormType = z.infer<typeof workspaceSearchFormSchema>
