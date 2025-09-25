import { Separator } from '@radix-ui/react-separator'
import { Container } from '@/components/layout/container'
import { TitlePage } from '@/components/layout/title-page'
import { SkeletonActionArea } from './skeleton-action-area'
import { SkeletonHeader } from './skeleton-header'
import { SkeletonWorkspaceCard } from './skeleton-workspace-card'

export function SkeletonHomePage() {
  return (
    <>
      <SkeletonHeader />

      <Container className="relative space-y-6 pb-8">
        <div className="mt-6">
          <TitlePage className="text-zinc-600">Meus Workspaces</TitlePage>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between items-center gap-6">
          <SkeletonActionArea />
        </div>

        <Separator />

        {/* LIST WORKSPACES */}
        <ul className="w-full flex-auto grid grid-cols-3 gap-4">
          <SkeletonWorkspaceCard />
          <SkeletonWorkspaceCard />
          <SkeletonWorkspaceCard />
        </ul>

        <div className="absolute inset-0 z-50 bg-gradient-to-b from-transparent to-background to-80%" />
      </Container>
    </>
  )
}
