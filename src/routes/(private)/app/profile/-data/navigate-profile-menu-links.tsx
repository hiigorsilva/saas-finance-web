import { SmilePlusIcon, UserCogIcon, UserIcon } from 'lucide-react'

export const navigateProfileMenuLinks = [
  {
    icon: <UserIcon className="size-4 shrink-0 text-foreground" />,
    title: 'Meu perfil',
    href: '/app/profile',
  },
  {
    icon: <UserCogIcon className="size-4 shrink-0 text-foreground" />,
    title: 'Minhas preferências',
    href: '/app/profile/preferences',
  },
  {
    icon: <SmilePlusIcon className="size-4 shrink-0 text-foreground" />,
    title: 'Teste de perfil financeiro',
    href: '/app/profile/financial-profile',
  },
]
