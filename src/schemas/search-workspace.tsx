import z from 'zod'

export const searchWorkspaceForm = z.object({
  title: z.string().optional(),
})

export type SearchWorkspaceFormType = z.infer<typeof searchWorkspaceForm>
