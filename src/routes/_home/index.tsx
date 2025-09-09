import { createFileRoute } from '@tanstack/react-router'
import { FolderOpenIcon, PlusIcon } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Header } from '../_app/-components/header'
import { SearchWorkspace } from './-components/search-workspace'

export const Route = createFileRoute('/_home/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Header hiddenLinks />
      <section className="flex flex-col flex-auto py-6">
        <Container>
          <div className="flex flex-col flex-1 gap-6">
            {/* TITLE PAGE */}
            <div className="flex justify-start items-center gap-2">
              <h1 className="font-semibold text-2xl text-foreground text-pretty leading-none tracking-tight">
                Meus Workspaces
              </h1>
            </div>

            {/* FILTERS */}
            <div className="flex justify-between items-center gap-6">
              <SearchWorkspace />

              <Button variant="gradient" className="text-foreground">
                Criar novo workspace
                <PlusIcon
                  className="size-5 text-foreground"
                  strokeWidth={1.5}
                />
              </Button>
            </div>

            <Separator />

            <ul className="flex flex-auto justify-center items-center gap-4 rounded-xl w-full">
              <div className="flex flex-col items-center gap-2 max-w-md">
                <FolderOpenIcon
                  className="size-16 shrink-0 text-muted-foreground"
                  strokeWidth={1}
                />

                <div className="flex flex-col items-center gap-0">
                  <span className="block text-sm text-muted-foreground text-center text-pretty">
                    Você não tem nenhum workspace criado.
                  </span>
                  <span className="block text-sm text-muted-foreground text-center text-pretty">
                    Crie um novo para poder registrar suas transações.
                  </span>
                </div>
              </div>
            </ul>
          </div>
        </Container>
      </section>
    </>
  )
}
