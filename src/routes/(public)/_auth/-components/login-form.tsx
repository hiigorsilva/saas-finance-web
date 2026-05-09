import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react'
import { useState } from 'react'
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
import { useAuth } from '@/contexts/auth-context'
import { type LoginFormType, loginFormSchema } from '@/schemas/login-form'

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(true)

  const navigate = useNavigate()
  const { signIn } = useAuth()

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: LoginFormType) {
    try {
      await signIn(data)
      await navigate({ to: '/' })
    } catch (_error) {
      toast.error('Falha ao realizar o login.')
    } finally {
    }
  }

  const handleToggleShowPassword = () => {
    setShowPassword(prevState => !prevState)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-0">
              <div className="space-y-3">
                <FormLabel className="font-semibold text-base text-foreground leading-none">
                  E-mail
                </FormLabel>
                <FormControl>
                  <div className="flex items-center border rounded-md px-3 has-[input:focus-within]:border-ring has-[input:focus-within]:ring-ring/50 has-[input:focus-within]:ring-[2px]">
                    <MailIcon
                      className="size-5 text-muted-foreground"
                      strokeWidth={1}
                    />
                    <Input
                      className="border-0 focus-visible:border-0 focus-visible:ring-0"
                      placeholder="Digite seu email"
                      {...field}
                    />
                  </div>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative flex flex-col gap-0">
              <div className="space-y-3">
                <FormLabel className="font-semibold text-base text-foreground leading-none">
                  Senha
                </FormLabel>
                <FormControl>
                  <div className="flex items-center border rounded-md pl-3 has-[input:focus-within]:border-ring has-[input:focus-within]:ring-ring/50 has-[input:focus-within]:ring-[2px]">
                    <LockIcon
                      className="size-5 text-muted-foreground"
                      strokeWidth={1}
                    />
                    <Input
                      className="border-0 focus-visible:border-0 focus-visible:ring-0"
                      placeholder="Digite sua senha"
                      type={showPassword ? 'password' : 'text'}
                      {...field}
                    />
                    <Button
                      onClick={handleToggleShowPassword}
                      className="border-l border-border rounded-none"
                      variant="ghost"
                      size="icon"
                      type="button"
                    >
                      {showPassword && (
                        <EyeIcon
                          className="size-4 text-muted-foreground"
                          strokeWidth={1}
                        />
                      )}

                      {!showPassword && (
                        <EyeOffIcon
                          className="size-4 text-muted-foreground"
                          strokeWidth={1}
                        />
                      )}
                    </Button>
                  </div>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end items-center">
          <Link
            to="/"
            className="text-base text-foreground underline transition hover:text-muted-foreground"
          >
            Esqueci minha senha
          </Link>
        </div>

        <Button
          className="drop-shadow-lg drop-shadow-muted-foreground/25 transition"
          variant="gradient"
          type="submit"
        >
          Entrar
        </Button>
      </form>

      <div className="flex justify-center items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Não tem uma conta?
        </span>
        <Link
          to="/register"
          className="text-sm text-foreground transition hover:text-muted-foreground underline"
        >
          Criar conta
        </Link>
      </div>
    </Form>
  )
}
