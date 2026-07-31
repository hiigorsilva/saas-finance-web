import { Link } from '@tanstack/react-router'
import { EllipsisIcon, FolderOpenIcon, UserIcon, UsersIcon } from 'lucide-react'
import type { ComponentProps } from 'react'
import { Button } from '@/components/ui/button'
import { WORKSPACE_LABELS, WORKSPACE_TYPE } from '@/data/labels/workspace-type'
import type { IWorkspace } from '@/services/workspace/workspace.d'
import { WorkspaceCardMenu } from './workspace-card-menu'

type WorkspaceCardProps = ComponentProps<'a'> & {
  workspace: IWorkspace
}

export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const handleOpenWorkspaceMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
  }

  return (
    <Link
      className="w-full flex flex-col gap-5 p-6 rounded-xl border shadow-md shadow-secondary transition hover:shadow-none hover:scale-[98%]"
      to="/app/$workspaceId"
      params={{ workspaceId: workspace.id }}
    >
      {/* HEADER */}
      <div className="w-full flex justify-between items-center gap-6">
        {/* ICON */}
        <div className="w-fit h-fit bg-primary/10 border border-primary/25 rounded-md p-2">
          <FolderOpenIcon
            className="size-5 shrink-0 text-primary"
            strokeWidth={1.5}
          />
        </div>

        {/* ACTIONS */}
        <div>
          <WorkspaceCardMenu workspace={workspace}>
            <Button
              variant="outline"
              size="icon"
              onClick={e => handleOpenWorkspaceMenu(e)}
            >
              <EllipsisIcon
                className="size-5 shrink-0 text-foreground"
                strokeWidth={1.5}
              />
            </Button>
          </WorkspaceCardMenu>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="flex flex-col items-start gap-2">
        <h2 className="font-semibold text-lg leading-none line-clamp-1 truncate">
          {workspace.name}
        </h2>
        <p className="w-full font-normal text-base text-muted-foreground text-pretty line-clamp-2 truncate">
          {workspace.description}
        </p>
      </div>

      {/* TYPE */}
      <div className="w-fit h-fit flex justify-start items-center gap-2 border rounded-sm px-2 py-1">
        {workspace.type === WORKSPACE_TYPE.PRIVATE ? (
          <UserIcon
            className="size-4 shrink-0 text-muted-foreground"
            strokeWidth={1.5}
          />
        ) : (
          <UsersIcon
            className="size-4 shrink-0 text-muted-foreground"
            strokeWidth={1.5}
          />
        )}

        <span className="font-normal text-base text-muted-foreground leading-none capitalize">
          {workspace.type === WORKSPACE_TYPE.PRIVATE
            ? WORKSPACE_LABELS[WORKSPACE_TYPE.PRIVATE]
            : WORKSPACE_LABELS[WORKSPACE_TYPE.SHARED]}
        </span>
      </div>
    </Link>
  )
}
