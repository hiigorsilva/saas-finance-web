import { createFileRoute } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'
import { useState } from 'react'
import { TitleIconPage } from '@/components/layout/title-icon-page'
import { TitlePage } from '@/components/layout/title-page'
import { financialProfileResponse } from '@/data/requests/financial-profile'
import { ProfileFinancialCard } from '../-components/profile-financial-card'
import { ProfileFinancialDialogForm } from '../-components/profile-financial-dialog-form'

export const Route = createFileRoute(
  '/(private)/app/profile/financial-profile/'
)({
  component: ProfileFinancialPage,
})

function ProfileFinancialPage() {
  const [openFinancialProfileForm, setOpenFinancialProfileForm] =
    useState(false)

  const { data } = financialProfileResponse.body

  const router = Route.useNavigate()

  const handleNavigateBack = () => {
    router({
      to: '/app/profile',
    })
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <TitleIconPage handleNavigateBack={handleNavigateBack}>
          <ChevronLeftIcon />
        </TitleIconPage>
        <TitlePage>Teste de Perfil Financeiro</TitlePage>
      </div>

      <p className="text-muted-foreground text-pretty">
        Responda o questionário abaixo para descobrir seu perfil financeiro.
        Escolha a alternativa que melhor descreve sua situação financeira atual.
      </p>

      <div className="w-full space-y-4">
        {!openFinancialProfileForm && (
          <ProfileFinancialCard
            profileType={data}
            openFormClick={setOpenFinancialProfileForm}
          />
        )}

        {openFinancialProfileForm && (
          <ProfileFinancialDialogForm
            openFormClick={setOpenFinancialProfileForm}
          />
        )}
      </div>
    </>
  )
}
