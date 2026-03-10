import { zodResolver } from '@hookform/resolvers/zod'
import { type ComponentProps, useState } from 'react'
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
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import {
  type AddWorkspaceFormType,
  addWorkspaceFormSchema,
} from '@/schemas/add-workspace-button'
import { WorkspaceService } from '@/services/workspace/workspace'

type AddWorkspaceButtonProps = ComponentProps<'button'> & {
  onFetchData: () => Promise<void>
}

export function AddWorkspaceButton({
  children,
  onFetchData,
}: AddWorkspaceButtonProps) {
  const [openModal, setOpenModal] = useState(false)

  const form = useForm<AddWorkspaceFormType>({
    resolver: zodResolver(addWorkspaceFormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const onSubmit = async (data: AddWorkspaceFormType) => {
    try {
      const res = await WorkspaceService.PostWorkspace(data)
      if (res.status === 200 || res.status === 201) {
        toast.success('Workspace criado com sucesso!')
        onFetchData()
        form.reset()
        setOpenModal(false)
      }
    } catch (_error) {
      toast.error('Erro ao criar workspace. Por favor, tente novamente.')
    }
  }

  const handleCancelForm = () => {
    form.reset()
    setOpenModal(false)
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Criar um Workspace</DialogTitle>
          <DialogDescription className="text-center">
            Crie um workspace e registre suas transações.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-10"
          >
            {/* NAME */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="font-normal">Nome *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Contas de casa"
                      autoFocus
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="absolute -bottom-5 left-0" />
                </FormItem>
              )}
            />

            {/* DESCRIPTION */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => {
                const maxLength = 100
                const currentLength = field.value?.length ?? 0
                const isDescriptionMaxLength = currentLength > maxLength

                return (
                  <FormItem className="relative">
                    <FormLabel className="font-normal">Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        className="max-w-full h-20 resize-none text-wrap pb-3"
                        placeholder="Ex: Controle financeiro de casa"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <div
                      className={`absolute -bottom-7 right-0 w-fit flex justify-center items-center border ${isDescriptionMaxLength && 'border-red-500'} ml-auto rounded-full px-2 py-1`}
                    >
                      <span
                        className={`inline-block text-xs ${isDescriptionMaxLength ? 'text-red-500' : 'text-muted-foreground'} leading-none`}
                      >
                        {currentLength} / {maxLength}
                      </span>
                    </div>
                    <FormMessage className="absolute -bottom-5 left-0" />
                  </FormItem>
                )
              }}
            />

            {/* TYPE */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="font-normal">Tipo *</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="max-w-72 w-full">
                        <SelectValue
                          {...field}
                          placeholder="Selecione o tipo"
                        />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="PRIVATE">Privado</SelectItem>
                        <SelectItem value="SHARED">Compartilhado</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="absolute -bottom-5 left-0" />
                </FormItem>
              )}
            />

            {/* ACTIONS */}
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
                Criar Workspace
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
