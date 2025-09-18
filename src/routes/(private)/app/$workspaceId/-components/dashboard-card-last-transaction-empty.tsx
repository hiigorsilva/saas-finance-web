import { NotepadTextIcon } from 'lucide-react'
import type { ComponentProps } from 'react'
import { TableCell, TableRow } from '@/components/ui/table'

type DashBoardCardLastTransactionsEmptyProps = ComponentProps<'span'>

export function DashBoardCardLastTransactionsEmpty({
  children,
}: DashBoardCardLastTransactionsEmptyProps) {
  return (
    <TableRow className="hover:bg-background">
      <TableCell>
        <div className="flex flex-col justify-center items-center gap-2">
          <NotepadTextIcon
            className="size-6 shrink-0 text-muted-foreground"
            strokeWidth={1.5}
          />
          <span className="inline-block font-normal text-sm text-muted-foreground">
            {children}
          </span>
        </div>
      </TableCell>
    </TableRow>
  )
}
