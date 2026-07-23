import { BellIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useInviteToWorkspaceQuery } from '@/hooks/queries/use-invite-workspace-query'
import { WorkspaceNotificationEmpty } from './workspace-notification-empty'
import { WorkspaceNotificationItem } from './workspace-notification-item'

export function WorkspaceNotification() {
  const [isOpen, setIsOpen] = useState(false)

  const { data: invites } = useInviteToWorkspaceQuery()

  if (!invites) return null

  return (
    <DropdownMenu open={isOpen} onOpenChange={open => setIsOpen(open)}>
      <DropdownMenuTrigger asChild>
        <Button className="relative" variant="ghost" size="icon">
          <BellIcon className="size-5 shrink-0 text-muted-foreground" />

          {invites.length > 0 && (
            <div className="absolute top-1.5 right-2 rounded-full p-0.5 bg-background">
              <span className="block size-1.5 bg-red-500 rounded-full" />
            </div>
          )}
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
            {invites.length === 0 && <WorkspaceNotificationEmpty />}

            {invites.map(invite => (
              <WorkspaceNotificationItem
                key={invite.id}
                invite={invite}
                setIsOpen={setIsOpen}
              />
            ))}
          </DropdownMenuGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
