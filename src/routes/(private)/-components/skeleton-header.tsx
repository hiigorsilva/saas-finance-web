import { Container } from '@/components/layout/container'
import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonHeader() {
  return (
    <header className="w-h-full border-b py-4">
      <Container>
        <div className="flex justify-between items-center gap-6">
          <Skeleton className="h-10 w-40" />

          <div className="flex items-center gap-4">
            <Skeleton className="size-12" />
            <Skeleton className="h-12 w-[72px]" />
          </div>
        </div>
      </Container>
    </header>
  )
}
