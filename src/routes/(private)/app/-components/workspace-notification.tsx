import { BellIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { WorkspaceNotificationItem } from './workspace-notification-item'

export function WorkspaceNotification() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <BellIcon className="size-5 shrink-0 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="max-w-96 w-full px-3 overflow-y-hidden"
      >
        <DropdownMenuLabel className="font-semibold text-xs text-muted-foreground uppercase tracking-widest px-3 py-3">
          Notificações
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="max-h-[50dvh] h-fit overflow-y-auto">
          <DropdownMenuGroup className="flex flex-col gap-4 py-3">
            {/* 
            <WorkspaceNotificationEmpty />
            */}
            <WorkspaceNotificationItem />
          </DropdownMenuGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
