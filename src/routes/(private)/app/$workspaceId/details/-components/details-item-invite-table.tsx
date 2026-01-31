import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon, PenIcon, Trash2Icon, UserIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ROLE_MEMBER_WORKSPACE_LABELS,
  ROLE_MEMBER_WORKSPACE_TYPE_VALUES,
} from '@/data/labels/role-member-workspace'
import { workspaceMembers } from '@/data/requests/workspace-members'
import {
  type EditMemberWorkspaceType,
  editMemberWorkspaceSchema,
} from '@/schemas/edit-member-workspace'

export function DetailsItemInviteTable() {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-fit flex items-center gap-1 px-2 py-1 rounded-md border">
        <p className="font-semibold text-xs text-muted-foreground uppercase leading-none tracking-widest">
          Membros (4)
        </p>
      </div>

      <Table>
        <TableCaption className="sr-only">
          Lista de membros do workspace
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead className="w-[120px]">Cargo</TableHead>
            <TableHead className="w-[104px]">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {workspaceMembers.map(member => (
            <TableRow key={member.id} className="border-0">
              {/* NAME */}
              <TableCell>
                <div className="flex justify-start items-center gap-2">
                  <div className="w-fit h-fit border border-muted-foreground/25 p-2 rounded-md">
                    <UserIcon className="size-4 shrink-0 text-muted-foreground" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-semibold text-sm text-foreground text-wrap leading-none">
                      {member.name}
                    </h3>
                    <p className="font-normal text-sm text-muted-foreground leading-none">
                      {member.email}
                    </p>
                  </div>
                </div>
              </TableCell>

              {/* ROLE */}
              <TableCell className="w-[120px]">
                <div className="w-fit flex items-center gap-1 px-2 py-1 rounded-md border">
                  <p className="font-normal text-sm text-muted-foreground capitalize leading-none">
                    {member.role.toLowerCase()}
                  </p>
                </div>
              </TableCell>

              {/* ACTIONS */}
              <TableCell className="w-[104px]">
                <div className="flex justify-between items-center gap-2">
                  <DetailsInviteMemberEdit>
                    <Button
                      className="hover:border hover:bg-background"
                      variant="ghost"
                      size="icon"
                    >
                      <PenIcon className="size-4 shrink-0 text-muted-foreground" />
                    </Button>
                  </DetailsInviteMemberEdit>

                  <DetailsInviteMemberRemove>
                    <Button
                      className="border-red-500/20 hover:border hover:bg-red-500/10"
                      variant="ghost"
                      size="icon"
                    >
                      <Trash2Icon className="size-4 shrink-0 text-red-500" />
                    </Button>
                  </DetailsInviteMemberRemove>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

type DetailsInviteMemberEditProps = {
  children: React.ReactNode
}

export function DetailsInviteMemberEdit({
  children,
}: DetailsInviteMemberEditProps) {
  const [openModal, setOpenModal] = useState(false)

  const form = useForm({
    resolver: zodResolver(editMemberWorkspaceSchema),
  })

  const onSubmit = async (data: EditMemberWorkspaceType) => {
    try {
      console.log('MEMBER', data)
      toast.success('Membro atualizado com sucesso!')
    } catch (error) {
      console.error('UPDATING_MEMBER_ERROR:', error)
      toast.error('Erro ao atualizar membro.')
    } finally {
      setOpenModal(false)
    }
  }

  const handleCancelForm = () => {
    form.reset()
    setOpenModal(false)
  }

  return (
    <Dialog open={openModal} onOpenChange={open => setOpenModal(open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Cargo de Membro</DialogTitle>
          <DialogDescription>
            Altere o cargo do membro conforme necessário.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="data"
              render={({ field }) => (
                <FormItem className="relative w-full flex flex-col gap-1">
                  <FormLabel className="font-normal text-base text-foreground">
                    Tipo
                  </FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="max-w-72 w-full min-h-10">
                        <SelectValue
                          {...field}
                          placeholder="Selecione o tipo"
                        />
                      </SelectTrigger>

                      <SelectContent>
                        {ROLE_MEMBER_WORKSPACE_TYPE_VALUES.map(type => (
                          <SelectItem key={type} value={type}>
                            {ROLE_MEMBER_WORKSPACE_LABELS[type]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="absolute -bottom-5 left-0" />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center gap-4">
              <Button
                className="flex-1"
                type="button"
                variant="outline"
                onClick={handleCancelForm}
              >
                Cancelar
              </Button>

              <Button className="flex-1" type="submit" variant="gradient">
                {form.formState.isSubmitting && (
                  <Loader2Icon className="size-4 shrink-0 text-foreground animate-spin" />
                )}
                {!form.formState.isSubmitting && 'Salvar alterações'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export function DetailsInviteMemberRemove({
  children,
}: DetailsInviteMemberEditProps) {
  const [openModal, setOpenModal] = useState(false)

  const handleMemberRemove = async () => {
    try {
      toast.success('Membro atualizado com sucesso!')
    } catch (error) {
      console.error('UPDATING_MEMBER_ERROR:', error)
      toast.error('Erro ao atualizar membro.')
    } finally {
      setOpenModal(false)
    }
  }

  const handleCancelForm = () => {
    setOpenModal(false)
  }

  return (
    <Dialog open={openModal} onOpenChange={open => setOpenModal(open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remover Membro?</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja remover o membro? Essa ação não poderá ser
            desfeita.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between items-center gap-4">
          <Button
            className="flex-1"
            type="button"
            variant="outline"
            onClick={handleCancelForm}
          >
            Cancelar
          </Button>

          <Button
            className="flex-1"
            type="submit"
            variant="gradient"
            onClick={handleMemberRemove}
          >
            Remover Membro
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
