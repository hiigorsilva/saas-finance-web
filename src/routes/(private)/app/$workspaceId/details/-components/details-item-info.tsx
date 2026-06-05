import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon, PenIcon, UsersIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  WORKSPACE_LABELS,
  WORKSPACE_VALUES,
} from '@/data/labels/workspace-type'
import { useUpdateWorkspaceMutation } from '@/hooks/mutations/use-update-workspace-mutation'
import {
  type EditWorkspaceDetailsButtonType,
  editWorkspaceDetailsButtonSchema,
} from '@/schemas/edit-workspace-details-button'
import { normalizeApiError } from '@/services/api/errors'
import type { IWorkspace } from '@/services/workspace/workspace.d'

type DetailsItemInfoProps = {
  workspace: IWorkspace
}

export function DetailsItemInfo({ workspace }: DetailsItemInfoProps) {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center gap-6">
        <CardTitle>Informações do workspace</CardTitle>

        <WorkspaceDetailsInfoEdit workspace={workspace}>
          <Button variant="ghost" size="icon">
            <PenIcon
              className="size-4 shrink-0 text-foreground"
              strokeWidth={1}
            />
          </Button>
        </WorkspaceDetailsInfoEdit>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <Separator />
        {/* TITLE */}
        {/* <div className="flex flex-col gap-1">
          <span className="inline-block font-normal text-sm text-muted-foreground leading-none tracking-wider uppercase">
            Slug
          </span>
          <p className="font-normal text-base text-foreground">
            {workspace.slug}
          </p>
        </div> */}
        {/* TITLE */}
        <div className="flex flex-col gap-1">
          <span className="inline-block font-normal text-sm text-muted-foreground leading-none tracking-wider uppercase">
            Título
          </span>
          <p className="font-normal text-base text-foreground">
            {workspace.name}
          </p>
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col gap-1">
          <span className="inline-block font-normal text-sm text-muted-foreground leading-none tracking-wider uppercase">
            Descrição
          </span>
          <p className="font-normal text-base text-foreground">
            {workspace.description}
          </p>
        </div>

        {/* TYPE */}
        <div className="flex flex-col gap-1.5">
          <span className="inline-block font-normal text-sm text-muted-foreground leading-none tracking-wider uppercase">
            Tipo
          </span>
          <div className="w-fit flex items-center gap-1 px-2 py-1 rounded-md border">
            <UsersIcon
              className="size-4 shrink-0 text-foreground"
              strokeWidth={1.5}
            />
            <p className="font-normal text-sm text-foreground uppercase leading-none tracking-widest">
              {WORKSPACE_LABELS[workspace.type]}
            </p>
          </div>
        </div>

        {/* CREATED BY */}
        <div className="flex flex-col gap-1.5">
          <span className="inline-block font-normal text-sm text-muted-foreground leading-none tracking-wider uppercase">
            Criado por
          </span>
          <div className="w-fit flex items-center gap-1 px-2 py-1 rounded-md border">
            <p className="font-normal text-sm text-foreground uppercase leading-none tracking-widest">
              15/07/2024
            </p>
          </div>
        </div>

        {/* CREATED AT */}
        <div className="flex flex-col gap-1.5">
          <span className="inline-block font-normal text-sm text-muted-foreground leading-none tracking-wider uppercase">
            Criador
          </span>
          <div className="w-fit flex items-center gap-1 px-2 py-1 rounded-md border">
            <p className="font-normal text-sm text-foreground uppercase leading-none tracking-widest">
              Higor Silva
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

type WorkspaceDetailsInfoEditProps = {
  children: React.ReactNode
  workspace: IWorkspace
}

export function WorkspaceDetailsInfoEdit({
  workspace,
  children,
}: WorkspaceDetailsInfoEditProps) {
  const [openModal, setOpenModal] = useState(false)
  const { mutateAsync: updateWorkspace } = useUpdateWorkspaceMutation()

  const form = useForm({
    resolver: zodResolver(editWorkspaceDetailsButtonSchema),
    defaultValues: {
      title: workspace.name,
      description: workspace.description,
      type: workspace.type,
    },
  })

  const onSubmit = async (data: EditWorkspaceDetailsButtonType) => {
    try {
      await updateWorkspace({
        workspaceId: workspace.id,
        description: data.description || undefined,
        name: data.title || undefined,
        type: data.type || undefined,
      })
      toast.success('Workspace atualizado com sucesso!')
      setOpenModal(false)
    } catch (error) {
      const apiError = normalizeApiError(error)
      toast.error(apiError.message)
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
          <DialogTitle>Editar Informações do Workspace</DialogTitle>
          <DialogDescription>
            Altere as informações do workspace conforme necessário.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 flex flex-col gap-6"
          >
            {/* <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem className="relative w-full flex flex-col gap-1">
                  <FormLabel className="font-normal text-base text-foreground">
                    Slug
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o slug do workspace..."
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="absolute -bottom-5 left-0" />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="relative w-full flex flex-col gap-1">
                  <FormLabel className="font-normal text-base text-foreground">
                    Título
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o título do workspace..."
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
              name="description"
              render={({ field }) => (
                <FormItem className="relative w-full flex flex-col gap-1">
                  <FormLabel className="font-normal text-base text-foreground">
                    Descrição
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a descrição do workspace..."
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
              name="type"
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
                        {WORKSPACE_VALUES.map(type => (
                          <SelectItem key={type} value={type}>
                            {WORKSPACE_LABELS[type]}
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
