import { zodResolver } from '@hookform/resolvers/zod'
import { ptBR } from 'date-fns/locale'
import {
  CalendarIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from 'lucide-react'
import { type ComponentProps, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import {
  type ProfileUserEditType,
  profileUserEditSchema,
} from '@/schemas/profile-user-data-edit-form'
import { dateFormatLong } from '@/utils/date-format'

type ProfileUserDataEditFormProps = ComponentProps<'button'> & {
  userData: Omit<ProfileUserEditType, 'id' | 'password'>
}

export function ProfileUserDataEditForm({
  userData,
  children,
}: ProfileUserDataEditFormProps) {
  const [openModal, setOpenModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<ProfileUserEditType>({
    resolver: zodResolver(profileUserEditSchema),
    defaultValues: {
      name: userData.name,
      email: userData.email,
      // password: userData.password,
      birthDate: userData.birthDate ?? undefined,
    },
  })

  const onSubmit = async (data: ProfileUserEditType) => {
    console.log('EDIT_USER_DATA', data)
    setOpenModal(false)
  }

  const handleCancelForm = () => {
    form.reset()
    setOpenModal(false)
  }

  const handleShowPasswordClick = () => {
    setShowPassword(prev => !prev)
  }

  const isDateValid = (date: Date) => {
    const currentDate = new Date()
    if (date <= currentDate) return false
    return true
  }

  useEffect(() => {
    form.reset({
      name: userData.name,
      email: userData.email,
      // password: userData.password,
      birthDate: userData.birthDate ? new Date(userData.birthDate) : undefined,
    })
  }, [userData])

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-h-[80dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            Editar dados do usuário
          </DialogTitle>
          <DialogDescription className="text-center">
            Edite seus dados de usuário.
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
                    <div className="flex items-center border rounded-md px-3 has-[input:focus-within]:border-ring has-[input:focus-within]:ring-ring/50 has-[input:focus-within]:ring-[2px]">
                      <UserIcon
                        className="size-5 text-muted-foreground"
                        strokeWidth={1}
                      />
                      <Input
                        className="w-full border-0 focus-visible:border-0 focus-visible:ring-0"
                        placeholder="Insira seu nome"
                        autoFocus={false}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="absolute -bottom-5 left-0" />
                </FormItem>
              )}
            />

            {/* EMAIL */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="font-normal">Email *</FormLabel>
                  <FormControl>
                    <div className="flex items-center border rounded-md px-3 has-[input:focus-within]:border-ring has-[input:focus-within]:ring-ring/50 has-[input:focus-within]:ring-[2px]">
                      <MailIcon
                        className="size-5 text-muted-foreground"
                        strokeWidth={1}
                      />
                      <Input
                        className="w-full border-0 focus-visible:border-0 focus-visible:ring-0"
                        placeholder="Insira seu email"
                        autoFocus={false}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="absolute -bottom-5 left-0" />
                </FormItem>
              )}
            />

            {/* PASSWORD */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="font-normal">Senha *</FormLabel>
                  <FormControl>
                    <div className="flex items-center border rounded-md pl-3 pr-0 overflow-hidden has-[input:focus-within]:border-ring has-[input:focus-within]:ring-ring/50 has-[input:focus-within]:ring-[2px]">
                      <LockIcon
                        className="size-5 text-muted-foreground"
                        strokeWidth={1}
                      />
                      <Input
                        className="w-full border-0 focus-visible:border-0 focus-visible:ring-0"
                        placeholder="Insira seu nova senha"
                        type={showPassword ? 'text' : 'password'}
                        autoFocus={false}
                        {...field}
                      />
                      {showPassword && (
                        <Button
                          className="h-full rounded-none border-l"
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={handleShowPasswordClick}
                        >
                          <EyeIcon className="size-4 shrink-0 text-muted-foreground" />
                        </Button>
                      )}
                      {!showPassword && (
                        <Button
                          className="h-full rounded-none border-l"
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={handleShowPasswordClick}
                        >
                          <EyeOffIcon className="size-4 shrink-0 text-muted-foreground" />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="absolute -bottom-5 left-0" />
                </FormItem>
              )}
            />

            {/* BIRTHDATE */}
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="font-normal">
                    Data de nascimento
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={`w-3xs font-normal text-foreground ${!field.value && 'text-muted-foreground'}`}
                          >
                            {field.value && dateFormatLong(field.value)}
                            {!field.value && <span>Selecionar data</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          className="capitalize"
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={isDateValid}
                          captionLayout="dropdown"
                          locale={ptBR}
                        />
                      </PopoverContent>
                    </Popover>
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
                Salvar dados
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
