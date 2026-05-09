import { createFileRoute } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'
import { TitleIconPage } from '@/components/layout/title-icon-page'
import { TitlePage } from '@/components/layout/title-page'
import { ProfilePreferencesSelectCard } from '../-components/profile-preferences-select-card'

export const Route = createFileRoute('/(private)/app/profile/preferences/')({
  component: PreferencesPage,
})

function PreferencesPage() {
  const router = Route.useNavigate()

  const handleNavigateBack = () => {
    router({
      to: '..',
    })
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <TitleIconPage handleNavigateBack={handleNavigateBack}>
          <ChevronLeftIcon />
        </TitleIconPage>
        <TitlePage>Minhas preferências</TitlePage>
      </div>

      <ProfilePreferencesSelectCard />
    </>
  )
}
