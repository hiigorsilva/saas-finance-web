import { CheckCircle2Icon } from 'lucide-react'
import type { ComponentProps } from 'react'

type DashboardCardExpenseByCategoryEmptyProps = ComponentProps<'span'>

export function DashboardCardExpenseByCategoryEmpty({
  children,
}: DashboardCardExpenseByCategoryEmptyProps) {
  return (
    <div className="flex flex-auto flex-col justify-center items-center gap-2">
      <CheckCircle2Icon
        className="size-6 shrink-0 text-green-500"
        strokeWidth={2}
      />
      <span className="inline-block font-normal text-sm text-muted-foreground">
        {children}
      </span>
    </div>
  )
}
