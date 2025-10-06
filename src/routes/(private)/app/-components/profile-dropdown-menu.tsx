import { Link, useNavigate } from '@tanstack/react-router'
import { ChevronDownIcon, LogOutIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { navigateProfileLinks } from '../-data/navigate-profile-links'
import { ProfileImage } from './profile-image'

export function ProfileDropdownMenu() {
  const router = useNavigate()

  const handleSignOut = () => {
    router({
      to: '/login',
      replace: true,
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-fit px-2" variant="ghost">
          <ProfileImage />

          <ChevronDownIcon
            className="size-4 shrink-0 text-foreground"
            strokeWidth={1}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="max-w-96 min-w-80 w-full flex flex-col p-6"
        align="end"
      >
        {/* HEADER */}
        <div className="flex flex-col items-start gap-3">
          <div className="flex flex-col items-start gap-2">
            <DropdownMenuLabel className="font-semibold text-base text-foreground leading-none p-0">
              Higor Silva
            </DropdownMenuLabel>
            <span className="font-normal text-sm text-muted-foreground leading-none">
              higorscontato@gmail.com
            </span>
          </div>

          <DropdownMenuSeparator className="w-full" />
        </div>

        <ul>
          {navigateProfileLinks.map(link => (
            <li key={link.title}>
              <Button
                className="w-full justify-start font-normal text-foreground px-0 hover:px-2 cursor-pointer"
                variant="ghost"
                asChild
              >
                <Link to={link.href}>
                  <div className="bg-primary/10 border border-primary/25 rounded-md p-2">
                    {link.icon}
                  </div>
                  {link.title}
                </Link>
              </Button>
            </li>
          ))}
        </ul>

        {/* FOOTER */}
        <div className="flex flex-col gap-2">
          <DropdownMenuSeparator className="w-full" />

          <DropdownMenuItem asChild>
            <Button
              className="w-full font-normal text-red-500 cursor-pointer"
              variant="outline"
              onClick={handleSignOut}
            >
              <LogOutIcon
                className="size-4 shrink-0 text-red-500"
                strokeWidth={1.5}
              />
              Sair
            </Button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
