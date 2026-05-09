import { useNavigate } from '@tanstack/react-router'
import { AlertCircleIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { WORKSPACE_TYPE } from '@/data/requests/workspaces'

type WorkspaceCardMenuDetailsOptionProps = {
  workspace: {
    id: string
    name: string
    description: string
    type: WORKSPACE_TYPE
  }
}

export function WorkspaceCardMenuDetailsOption({
  workspace,
}: WorkspaceCardMenuDetailsOptionProps) {
  const router = useNavigate()

  const handleRedirectClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()

    router({
      to: '/app/$workspaceId/details',
      params: { workspaceId: workspace.id },
    })
  }

  return (
    <Button
      variant="ghost"
      className="w-full justify-start cursor-pointer px-2"
      onClick={e => handleRedirectClick(e)}
    >
      <div className="w-fit h-fit bg-primary/10 border border-primary/25 rounded-md p-2">
        <AlertCircleIcon className="size-4 shrink-0 text-primary" />
      </div>

      <span className="inline-block w-full font-normal text-base text-start text-foreground">
        Detalhes
      </span>

      <ChevronRightIcon
        className="size-4 shrink-0 text-muted-foreground/50 ml-auto"
        strokeWidth={1}
      />
    </Button>
  )
}
