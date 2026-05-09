import type { ComponentProps } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { WORKSPACE_TYPE } from '@/data/requests/workspaces'
import { WorkspaceCardMenuDashboardOption } from './workspace-card-menu-dashboard-option'
import { WorkspaceCardMenuDetailsOption } from './workspace-card-menu-details-option'

type WorkspaceCardMenuProps = ComponentProps<'div'> & {
  workspace: {
    id: string
    name: string
    description: string
    type: WORKSPACE_TYPE
  }
}

export function WorkspaceCardMenu({
  workspace,
  children,
}: WorkspaceCardMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent className="max-w-80 w-full">
        <DropdownMenuItem asChild>
          <WorkspaceCardMenuDashboardOption workspace={workspace} />
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <WorkspaceCardMenuDetailsOption workspace={workspace} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
