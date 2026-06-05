import { CircleHelpIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type DashboardCardTipProps = {
  label: string
  description: string
}

export function DashboardCardTip({
  label,
  description,
}: DashboardCardTipProps) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <CircleHelpIcon className="size-4 shrink-0" strokeWidth={2} />
      </TooltipTrigger>

      <TooltipContent
        side="top"
        align="end"
        className="w-80 p-3 text-xs leading-relaxed"
      >
        <p className="font-semibold text-foreground">{label}</p>
        <p className="mt-1 text-muted-foreground">{description}</p>
      </TooltipContent>
    </Tooltip>
  )
}
