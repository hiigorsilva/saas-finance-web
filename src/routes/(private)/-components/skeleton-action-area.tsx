import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonActionArea() {
  return (
    <>
      <Skeleton className="max-w-72 w-full h-11" />

      <Button
        variant="gradient"
        className="drop-shadow-md hover:drop-shadow-none saturate-0"
      >
        <PlusIcon
          className="size-5 shrink-0 text-foreground"
          strokeWidth={1.5}
        />

        <span className="text-sm text-foreground">Criar novo Workspace</span>
      </Button>
    </>
  )
}
