import {
  DollarSignIcon,
  HomeIcon,
  LayoutDashboardIcon,
  SettingsIcon,
} from 'lucide-react'

export const navigateMenuLinks = [
  {
    icon: <HomeIcon />,
    title: 'Overview',
    href: '/app',
  },
  {
    icon: <LayoutDashboardIcon />,
    title: 'Dashboard',
    href: '/app/$workspaceId',
  },
  {
    icon: <DollarSignIcon />,
    title: 'Transações',
    href: '/app/$workspaceId/transaction',
  },
  {
    icon: <SettingsIcon />,
    title: 'Gerenciar',
    href: '/app/$workspaceId/manager',
  },
]
