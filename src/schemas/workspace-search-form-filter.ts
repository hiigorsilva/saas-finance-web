import z from 'zod'
import { validateSearchTerm } from '@/utils/search'

const normalizeWorkspaceSearchParam = z.preprocess(value => {
  return validateSearchTerm(typeof value === 'string' ? value : undefined)
}, z.string().optional().catch(undefined))

export const workspaceListSearchSchema = z.object({
  search: normalizeWorkspaceSearchParam,
})

export type WorkspaceListSearchType = z.infer<typeof workspaceListSearchSchema>
