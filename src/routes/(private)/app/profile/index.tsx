import { createFileRoute } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'
import { TitleIconPage } from '@/components/layout/title-icon-page'
import { TitlePage } from '@/components/layout/title-page'
import { ProfileUserDataEditCard } from './-components/profile-user-data-edit-card'

export const Route = createFileRoute('/(private)/app/profile/')({
  component: ProfilePage,
})

function ProfilePage() {
  const router = Route.useNavigate()

  const handleNavigateBack = () => {
    router({
      to: '/app',
    })
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <TitleIconPage handleNavigateBack={handleNavigateBack}>
          <ChevronLeftIcon />
        </TitleIconPage>
        <TitlePage>Perfil</TitlePage>
      </div>

      <ProfileUserDataEditCard />
    </>
  )
}
