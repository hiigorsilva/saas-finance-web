import z from 'zod'

export const inviteMemberFormSchema = z.object({
  email: z.email(),
})
export type InviteMemberFormSchemaType = z.infer<typeof inviteMemberFormSchema>
