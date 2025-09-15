import z from 'zod'

export const inviteMemberFormSchema = z.object({
  email: z.email('Informe um e-mail válido'),
})
export type InviteMemberFormSchemaType = z.infer<typeof inviteMemberFormSchema>
