import { PenIcon, UsersIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function DetailsItemInfo() {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center gap-6">
        <CardTitle>Informações do workspace</CardTitle>
        <Button variant="ghost" size="icon">
          <PenIcon
            className="size-4 shrink-0 text-foreground"
            strokeWidth={1}
          />
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <Separator />
        {/* TITLE */}
        <div className="flex flex-col gap-1">
          <span className="inline-block font-normal text-sm text-muted-foreground leading-none tracking-wider uppercase">
            Título
          </span>
          <p className="font-normal text-base text-foreground">
            Viagem para Gramado
          </p>
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col gap-1">
          <span className="inline-block font-normal text-sm text-muted-foreground leading-none tracking-wider uppercase">
            Descrição
          </span>
          <p className="font-normal text-base text-foreground">
            Centralização de todos os gastos realizados nessa viagem para
            facilitar o controle.
          </p>
        </div>

        {/* TYPE */}
        <div className="flex flex-col gap-1.5">
          <span className="inline-block font-normal text-sm text-muted-foreground leading-none tracking-wider uppercase">
            Tipo
          </span>
          <div className="w-fit flex items-center gap-1 px-2 py-1 rounded-md border">
            <UsersIcon
              className="size-4 shrink-0 text-foreground"
              strokeWidth={1.5}
            />
            <p className="font-normal text-sm text-foreground uppercase leading-none tracking-widest">
              Compartilhado
            </p>
          </div>
        </div>

        {/* CREATED BY */}
        <div className="flex flex-col gap-1.5">
          <span className="inline-block font-normal text-sm text-muted-foreground leading-none tracking-wider uppercase">
            Criado por
          </span>
          <div className="w-fit flex items-center gap-1 px-2 py-1 rounded-md border">
            <p className="font-normal text-sm text-foreground uppercase leading-none tracking-widest">
              15/07/2024
            </p>
          </div>
        </div>

        {/* CREATED AT */}
        <div className="flex flex-col gap-1.5">
          <span className="inline-block font-normal text-sm text-muted-foreground leading-none tracking-wider uppercase">
            Criador
          </span>
          <div className="w-fit flex items-center gap-1 px-2 py-1 rounded-md border">
            <p className="font-normal text-sm text-foreground uppercase leading-none tracking-widest">
              Higor Silva
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
