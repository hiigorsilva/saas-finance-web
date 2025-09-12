import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  type InviteMemberFormSchemaType,
  inviteMemberFormSchema,
} from '@/schemas/invite-member-form'

export const Route = createFileRoute(
  '/(private)/app/$workspaceId/invite-member/'
)({
  component: InviteMemberPage,
})

function InviteMemberPage() {
  const form = useForm<InviteMemberFormSchemaType>({
    resolver: zodResolver(inviteMemberFormSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: InviteMemberFormSchemaType) => {
    console.log(data)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="Digite o email de um usuário" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center gap-4">
          <Button className="flex-1" variant="outline" size="sm" type="button">
            Cancelar
          </Button>
          <Button className="flex-1" variant="gradient" size="sm" type="submit">
            Convidar
          </Button>
        </div>
      </form>
    </Form>
  )
}
