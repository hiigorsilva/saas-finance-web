import { zodResolver } from '@hookform/resolvers/zod'
import { UserPlusIcon } from 'lucide-react'
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

export function DetailsItemInviteMemberForm() {
  const form = useForm<InviteMemberFormSchemaType>({
    resolver: zodResolver(inviteMemberFormSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (data: InviteMemberFormSchemaType) => {
    console.log('MEMBER', data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 flex items-end gap-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative max-w-sm w-full flex flex-col gap-1">
              <FormLabel className="font-normal text-base text-foreground">
                E-mail
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o email de um usuário..."
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute -bottom-5 left-0" />
            </FormItem>
          )}
        />

        <Button
          className="w-fit shadow-lg shadow-foreground/10 hover:shadow-none"
          variant="gradient"
        >
          <UserPlusIcon className="size-4 shrink-0 text-foreground" />
          Convidar
        </Button>
      </form>
    </Form>
  )
}
