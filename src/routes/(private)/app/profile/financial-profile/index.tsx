import { createFileRoute } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { TitleIconPage } from '@/components/layout/title-icon-page'
import { TitlePage } from '@/components/layout/title-page'
import { ProfileFinancialDialogForm } from '../-components/profile-financial-dialog-form'

export const Route = createFileRoute(
  '/(private)/app/profile/financial-profile/'
)({
  component: ProfileFinancialPage,
})

function ProfileFinancialPage() {
  const router = Route.useNavigate()

  const handleNavigateBack = () => {
    router({
      to: '..',
    })
  }

  return (
    <Container className="gap-6 py-6">
      <div className="flex items-center gap-2">
        <TitleIconPage handleNavigateBack={handleNavigateBack}>
          <ChevronLeftIcon />
        </TitleIconPage>
        <TitlePage>Teste de Perfil Financeiro</TitlePage>
      </div>

      <div className="max-w-2xl w-full space-y-4 mx-auto">
        <ProfileFinancialDialogForm />
      </div>
    </Container>
  )
}
