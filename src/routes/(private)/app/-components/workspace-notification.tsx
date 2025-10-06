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
import { workspaceInvitationsResponse } from '@/data/requests/workspace-invitations'
import { WorkspaceNotificationEmpty } from './workspace-notification-empty'
import { WorkspaceNotificationItem } from './workspace-notification-item'

export function WorkspaceNotification() {
  const { data: workspaceInvitations, totalCount } =
    workspaceInvitationsResponse.body

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative" variant="ghost" size="icon">
          <BellIcon className="size-5 shrink-0 text-muted-foreground" />

          <div className="absolute top-1.5 right-2 rounded-full p-0.5 bg-background">
            <span className="block size-1.5 bg-red-500 rounded-full" />
          </div>
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
            {totalCount === 0 && <WorkspaceNotificationEmpty />}
            {totalCount > 0 &&
              workspaceInvitations.map(workspaceInvitation => (
                <WorkspaceNotificationItem
                  key={workspaceInvitation.id}
                  workspaceInvitations={workspaceInvitation}
                />
              ))}
          </DropdownMenuGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
