import { NotepadTextIcon } from 'lucide-react'
import type { ComponentProps } from 'react'

type DashboardCardExpenseByCategoryEmptyProps = ComponentProps<'span'>

export function DashboardCardExpenseByCategoryEmpty({
  children,
}: DashboardCardExpenseByCategoryEmptyProps) {
  return (
    <div className="flex flex-auto flex-col justify-center items-center gap-2">
      <NotepadTextIcon
        className="size-6 shrink-0 text-muted-foreground"
        strokeWidth={1.5}
      />
      <span className="inline-block font-normal text-sm text-muted-foreground">
        {children}
      </span>
    </div>
  )
}
