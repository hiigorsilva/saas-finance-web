import z from 'zod'
import { WORKSPACE_VALUES } from '@/data/labels/workspace-type'

export const editWorkspaceDetailsButtonSchema = z.object({
  slug: z.string().trim().optional(),
  title: z.string().trim().optional(),
  description: z.string().trim().optional(),
  type: z.enum(WORKSPACE_VALUES).optional(),
})
export type EditWorkspaceDetailsButtonType = z.infer<
  typeof editWorkspaceDetailsButtonSchema
>
