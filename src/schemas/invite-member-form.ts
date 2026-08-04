import z from 'zod'
import { ROLE_MEMBER_WORKSPACE_TYPE_VALUES } from '@/data/labels/role-member-workspace'

export const inviteMemberFormSchema = z.object({
  email: z.email('Informe um e-mail válido'),
  role: z.enum(ROLE_MEMBER_WORKSPACE_TYPE_VALUES, 'Selecione um cargo válido'),
})
export type InviteMemberFormSchemaType = z.infer<typeof inviteMemberFormSchema>
