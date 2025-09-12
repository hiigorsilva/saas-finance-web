import { useNavigate } from '@tanstack/react-router'
import { ChevronRightIcon, UserPlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { WORKSPACE_TYPE } from '@/data/requests/workspaces'

type WorkspaceCardMenuInviteMemberOptionProps = {
  workspace: {
    id: string
    name: string
    description: string
    type: WORKSPACE_TYPE
  }
}

export function WorkspaceCardMenuInviteMemberOption({
  workspace,
}: WorkspaceCardMenuInviteMemberOptionProps) {
  const router = useNavigate()

  const handleRedirectToInviteMemberPage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()

    router({
      to: '/app/$workspaceId/invite-member',
      params: { workspaceId: workspace.id },
    })
  }

  return (
    <Button
      className="w-full justify-start cursor-pointer px-2"
      variant="ghost"
      onClick={e => handleRedirectToInviteMemberPage(e)}
    >
      <div className="w-fit h-fit bg-primary/10 border border-primary/25 rounded-md p-2">
        <UserPlusIcon className="size-4 shrink-0 text-primary" />
      </div>

      <span className="inline-block w-full font-normal text-base text-start text-foreground">
        Convidar membro
      </span>

      <ChevronRightIcon
        className="size-4 shrink-0 text-muted-foreground/50 ml-auto"
        strokeWidth={1}
      />
    </Button>
  )
}
