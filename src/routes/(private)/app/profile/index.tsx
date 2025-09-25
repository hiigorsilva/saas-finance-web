import { createFileRoute } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { TitleIconPage } from '@/components/layout/title-icon-page'
import { TitlePage } from '@/components/layout/title-page'
import { financialProfileResponse } from '@/data/requests/financial-profile'
import { userResponse } from '@/data/requests/user'
import { ProfileFinancialCard } from './-components/profile-financial-card'
import { ProfilePreferencesSelectCard } from './-components/profile-preferences-select-card'
import { ProfileUserDataEditCard } from './-components/profile-user-data-edit-card'

export const Route = createFileRoute('/(private)/app/profile/')({
  component: ProfilePage,
})

function ProfilePage() {
  const router = Route.useNavigate()

  const { data: user } = userResponse.body
  const { data: profileType } = financialProfileResponse.body

  const handleNavigateBack = () => {
    router({
      to: '/app',
    })
  }

  return (
    <Container className="gap-6 py-6">
      {/* TITLE */}
      <div className="flex items-center gap-2">
        <TitleIconPage handleNavigateBack={handleNavigateBack}>
          <ChevronLeftIcon />
        </TitleIconPage>
        <TitlePage>Perfil</TitlePage>
      </div>

      <ProfileUserDataEditCard user={user} />

      <div className="grid grid-cols-2 gap-6">
        <ProfilePreferencesSelectCard />
        <ProfileFinancialCard profileType={profileType} />
      </div>
    </Container>
  )
}
