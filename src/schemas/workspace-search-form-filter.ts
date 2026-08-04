import z from 'zod'

const normalizeWorkspaceSearchParam = z.preprocess(value => {
  if (typeof value !== 'string') return undefined

  const normalized = value.trim()
  return normalized.length ? normalized : undefined
}, z.string().optional().catch(undefined))

export const workspaceListSearchSchema = z.object({
  searchWorkspace: normalizeWorkspaceSearchParam,
})

export type WorkspaceListSearchType = z.infer<typeof workspaceListSearchSchema>
