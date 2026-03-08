import {
  CalendarIcon,
  FolderIcon,
  LockIcon,
  MailIcon,
  PenIcon,
  UserIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UserService } from '@/services/user/user'
import type { IUserLogged } from '@/services/user/user.d'
import { ProfileUserDataEditForm } from './profile-user-data-edit-form'

export function ProfileUserDataEditCard() {
  const [user, setUser] = useState<IUserLogged>({} as IUserLogged)

  async function fetchData() {
    try {
      const res = await UserService.GetUserLogged()
      if (res.status === 200 || res.status === 204) {
        const user = res.data.body.data
        setUser(user)
      }
    } catch (_error) {
      toast.error('Erro ao carregar os dados do usuário')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader className="w-full flex justify-between items-center gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex justify-start items-center gap-2">
            <FolderIcon
              className="size-5 shrink-0 text-foreground"
              strokeWidth={1.5}
            />
            <CardTitle className="text-lg text-foreground">
              Dados pessoais
            </CardTitle>
          </div>
          <CardDescription className="text-base text-muted-foreground">
            Edite seus dados pessoais
          </CardDescription>
        </div>

        <ProfileUserDataEditForm userData={user}>
          <Button variant="outline" size="icon">
            <PenIcon className="size-4 shrink-0 text-muted-foreground" />
          </Button>
        </ProfileUserDataEditForm>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <form className="grid grid-cols-2 gap-6">
          {/* NAME */}
          <div className="flex flex-auto flex-col gap-2">
            <Label>Nome</Label>
            <div className="flex items-center border rounded-md px-3 has-[input:focus-within]:border-ring has-[input:focus-within]:ring-ring/50 has-[input:focus-within]:ring-[2px]">
              <UserIcon
                className="size-5 text-muted-foreground"
                strokeWidth={1}
              />
              <Input
                className="w-full border-0 focus-visible:border-0 focus-visible:ring-0"
                value={user.name}
                placeholder="Insira seu nome"
                disabled
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex flex-auto flex-col gap-2">
            <Label>Email</Label>
            <div className="flex items-center border rounded-md px-3 has-[input:focus-within]:border-ring has-[input:focus-within]:ring-ring/50 has-[input:focus-within]:ring-[2px]">
              <MailIcon
                className="size-5 text-muted-foreground"
                strokeWidth={1}
              />
              <Input
                className="w-full border-0 focus-visible:border-0 focus-visible:ring-0"
                value={user.email}
                placeholder="Insira seu email"
                disabled
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="flex flex-auto flex-col gap-2">
            <Label>Senha</Label>
            <div className="flex items-center border rounded-md px-3 has-[input:focus-within]:border-ring has-[input:focus-within]:ring-ring/50 has-[input:focus-within]:ring-[2px]">
              <LockIcon
                className="size-5 text-muted-foreground"
                strokeWidth={1}
              />
              <Input
                className="w-full border-0 focus-visible:border-0 focus-visible:ring-0"
                type="password"
                value={'*'.repeat(8)}
                placeholder="Insira sua senha"
                disabled
              />
            </div>
          </div>

          {/* BIRTHDATE */}
          <div className="flex flex-auto flex-col gap-2">
            <Label>Data de nascimento</Label>
            <div className="flex items-center border rounded-md px-3 has-[input:focus-within]:border-ring has-[input:focus-within]:ring-ring/50 has-[input:focus-within]:ring-[2px]">
              <CalendarIcon
                className="size-5 text-muted-foreground"
                strokeWidth={1}
              />
              <Input
                className="w-full border-0 focus-visible:border-0 focus-visible:ring-0"
                value={Intl.DateTimeFormat('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }).format(new Date())}
                placeholder="Insira sua data de nascimento"
                disabled
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
