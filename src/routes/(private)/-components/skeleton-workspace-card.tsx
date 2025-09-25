import { EllipsisIcon, FolderOpenIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonWorkspaceCard() {
  return (
    <div className="w-full h-fit flex flex-col gap-5 p-6 rounded-xl border shadow-md shadow-secondary transition hover:shadow-none hover:scale-[98%]">
      {/* HEADER */}
      <div className="w-full flex justify-between items-center gap-6">
        {/* ICON */}
        <div className="w-fit h-fit bg-primary/10 border border-primary/25 rounded-md p-2 saturate-0">
          <FolderOpenIcon
            className="size-5 shrink-0 text-primary"
            strokeWidth={1.5}
          />
        </div>

        {/* ACTIONS */}
        <div>
          <Button variant="outline" size="icon">
            <EllipsisIcon
              className="size-5 shrink-0 text-foreground"
              strokeWidth={1.5}
            />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2">
        {/* TITLE */}
        <Skeleton className="w-1/2 h-4 bg-zinc-400" />

        {/* DESCRIPTION */}
        <Skeleton className="w-full h-3 bg-zinc-200" />
        <Skeleton className="w-9/12 h-3 bg-zinc-200" />
      </div>

      {/* TYPE */}
      <div className="w-fit h-fit flex justify-start items-center gap-2 border rounded-sm px-2 py-1">
        <Skeleton className="size-4 bg-zinc-200" />

        <Skeleton className="w-[100px] h-2 bg-zinc-200" />
      </div>
    </div>
  )
}
