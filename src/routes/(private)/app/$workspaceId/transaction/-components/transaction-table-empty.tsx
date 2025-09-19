import { NotepadTextIcon } from 'lucide-react'
import type { ComponentProps } from 'react'
import { TableCell, TableRow } from '@/components/ui/table'

type TransactionTableEmptyProps = ComponentProps<'tr'>

export function TransactionTableEmpty({
  children,
}: TransactionTableEmptyProps) {
  return (
    <TableRow className="hover:bg-background border-none">
      <TableCell className="font-semibold">
        <div className="flex flex-col justify-center items-center gap-2">
          <NotepadTextIcon
            className="size-7 shrink-0 text-muted-foreground"
            strokeWidth={1.5}
          />
          <span className="flex flex-col gap-0 font-normal text-sm text-center text-muted-foreground">
            {children}
          </span>
        </div>
      </TableCell>
    </TableRow>
  )
}
