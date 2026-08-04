import z from 'zod'
import { ROLE_MEMBER_WORKSPACE_TYPE_VALUES } from '@/data/labels/role-member-workspace'

export const editMemberWorkspaceSchema = z.object({
  role: z.enum(ROLE_MEMBER_WORKSPACE_TYPE_VALUES),
})

export type EditMemberWorkspaceType = z.infer<typeof editMemberWorkspaceSchema>
