import { createFileRoute } from '@tanstack/react-router'
import { RegisterForm } from '../-components/register-form'

export const Route = createFileRoute('/_auth/register')({
  component: RegisterPage,
})

function RegisterPage() {
  return (
    <section className="flex-auto grid grid-cols-1 md:grid-cols-2">
      {/* FORM REGISTER */}
      <div className="flex flex-col justify-center items-center p-5 lg:p-0">
        <div className="max-w-[28rem] w-full flex flex-col gap-8">
          <div className="flex flex-col items-center sm:items-start gap-3">
            <h1 className="font-semibold text-2xl sm:text-3xl text-center sm:text-start text-foreground leading-none tracking-tight">
              Crie sua conta grátis
            </h1>
            <p className="text-base text-center sm:text-start text-muted-foreground text-pretty">
              Assuma o controle da sua vida financeira hoje mesmo.
            </p>
          </div>

          <RegisterForm />
        </div>
      </div>

      {/* IMAGE COVER */}
      <div className="hidden md:flex relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-yellow-400 to-120%"></div>
      </div>
    </section>
  )
}
