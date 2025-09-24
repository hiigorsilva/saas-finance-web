import {
  AlertCircleIcon,
  CircleFadingArrowUpIcon,
  UserIcon,
} from 'lucide-react'

export const navigateProfileLinks = [
  {
    icon: <UserIcon className="size-4 shrink-0 text-primary" strokeWidth={2} />,
    title: 'Meu Perfil',
    href: '/app/profile',
  },
  {
    icon: (
      <CircleFadingArrowUpIcon
        className="size-4 shrink-0 text-primary"
        strokeWidth={2}
      />
    ),
    title: 'Fazer Upgrade',
    href: '/pricing',
  },
  {
    icon: (
      <AlertCircleIcon
        className="size-4 shrink-0 text-primary"
        strokeWidth={2}
      />
    ),
    title: 'Suporte',
    href: '/support',
  },
]
