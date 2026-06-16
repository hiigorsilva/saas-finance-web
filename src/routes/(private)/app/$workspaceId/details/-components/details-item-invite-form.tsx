import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from '@tanstack/react-router'
import { UserPlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ROLE_MEMBER_WORKSPACE_LABELS,
  ROLE_MEMBER_WORKSPACE_TYPE,
  ROLE_MEMBER_WORKSPACE_TYPE_VALUES,
} from '@/data/labels/role-member-workspace'
import { useAddMemberToWorkspaceMutation } from '@/hooks/mutations/use-add-member-workspace-mutation'
import {
  type InviteMemberFormSchemaType,
  inviteMemberFormSchema,
} from '@/schemas/invite-member-form'
import { normalizeApiError } from '@/services/api/errors'

export function DetailsItemInviteMemberForm() {
  const form = useForm<InviteMemberFormSchemaType>({
    resolver: zodResolver(inviteMemberFormSchema),
    defaultValues: {
      email: '',
      role: ROLE_MEMBER_WORKSPACE_TYPE.MEMBER,
    },
  })

  const { workspaceId } = useParams({ from: '/(private)/app/$workspaceId' })
  const { mutateAsync: addMemberToWorkspace } =
    useAddMemberToWorkspaceMutation()

  const onSubmit = async (data: InviteMemberFormSchemaType) => {
    try {
      const member = await addMemberToWorkspace({ workspaceId, ...data })
      if (member.id) {
        toast.success('Convite enviado com sucesso!')
        form.reset()
      }
    } catch (error) {
      const apiError = normalizeApiError(error)
      toast.error(apiError.message)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 flex justify-start items-end gap-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative w-full flex flex-col gap-1">
              <FormLabel className="font-normal text-base text-foreground">
                E-mail
              </FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Digite o email de um usuário..."
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute -bottom-5 left-0" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="relative w-fit flex flex-col gap-1">
              <FormLabel className="font-normal text-base text-foreground">
                Cargo
              </FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-full max-w-52 min-w-36">
                    <SelectValue placeholder="Selecione um cargo" {...field} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Cargos</SelectLabel>
                      {ROLE_MEMBER_WORKSPACE_TYPE_VALUES.map(role => (
                        <SelectItem key={role} value={role}>
                          {ROLE_MEMBER_WORKSPACE_LABELS[role]}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
