import { useNavigate } from '@tanstack/react-router'
import { ChevronRightIcon, LayoutDashboardIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { WORKSPACE_TYPE } from '@/data/requests/workspaces'

type WorkspaceCardMenuDashboardOptionProps = {
  workspace: {
    id: string
    name: string
    description: string
    type: WORKSPACE_TYPE
  }
}

export function WorkspaceCardMenuDashboardOption({
  workspace,
}: WorkspaceCardMenuDashboardOptionProps) {
  const router = useNavigate()

  const handleRedirectClick = () => {
    router({
      to: '/app/$workspaceId',
      params: { workspaceId: workspace.id },
    })
  }

  return (
    <Button
      variant="ghost"
      className="w-full justify-start cursor-pointer px-2"
      onClick={handleRedirectClick}
    >
      <div className="w-fit h-fit bg-primary/10 border border-primary/25 rounded-md p-2">
        <LayoutDashboardIcon className="size-4 shrink-0 text-primary" />
      </div>

      <span className="inline-block w-full font-normal text-base text-start text-foreground">
        Ir para dashboard
      </span>

      <ChevronRightIcon
        className="size-4 shrink-0 text-muted-foreground/50 ml-auto"
        strokeWidth={1}
      />
    </Button>
  )
}
