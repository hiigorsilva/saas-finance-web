import { PenIcon, Trash2Icon, UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { workspaceMembers } from '@/data/requests/workspace-members'

export function DetailsItemInviteTable() {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-fit flex items-center gap-1 px-2 py-1 rounded-md border">
        <p className="font-semibold text-xs text-muted-foreground uppercase leading-none tracking-widest">
          Membros (4)
        </p>
      </div>

      <Table>
        <TableCaption className="sr-only">
          Lista de membros do workspace
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead className="w-[120px]">Cargo</TableHead>
            <TableHead className="w-[104px]">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {workspaceMembers.map(member => (
            <TableRow key={member.id} className="border-0">
              {/* NAME */}
              <TableCell>
                <div className="flex justify-start items-center gap-2">
                  <div className="w-fit h-fit border border-muted-foreground/25 p-2 rounded-md">
                    <UserIcon className="size-4 shrink-0 text-muted-foreground" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-semibold text-sm text-foreground text-wrap leading-none">
                      {member.name}
                    </h3>
                    <p className="font-normal text-sm text-muted-foreground leading-none">
                      {member.email}
                    </p>
                  </div>
                </div>
              </TableCell>

              {/* ROLE */}
              <TableCell className="w-[120px]">
                <div className="w-fit flex items-center gap-1 px-2 py-1 rounded-md border">
                  <p className="font-normal text-sm text-muted-foreground capitalize leading-none">
                    {member.role.toLowerCase()}
                  </p>
                </div>
              </TableCell>

              {/* ACTIONS */}
              <TableCell className="w-[104px]">
                <div className="flex justify-between items-center gap-2">
                  <Button
                    className="hover:border hover:bg-background"
                    variant="ghost"
                    size="icon"
                  >
                    <PenIcon className="size-4 shrink-0 text-muted-foreground" />
                  </Button>

                  <Button
                    className="border-red-500/20 hover:border hover:bg-red-500/10"
                    variant="ghost"
                    size="icon"
                  >
                    <Trash2Icon className="size-4 shrink-0 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
