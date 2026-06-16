import z from 'zod'
import { MemberRolesType } from '@/services/workspace/workspace.d'

export const inviteMemberFormSchema = z.object({
  email: z.email('Informe um e-mail válido'),
  role: z.enum(
    [
      MemberRolesType.ADMIN,
      MemberRolesType.MEMBER,
      MemberRolesType.OWNER,
      MemberRolesType.VIEWER,
    ],
    { error: 'Selecione um cargo válido' }
  ),
})
export type InviteMemberFormSchemaType = z.infer<typeof inviteMemberFormSchema>
