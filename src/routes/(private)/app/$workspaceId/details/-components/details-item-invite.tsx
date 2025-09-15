import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { DetailsItemInviteMemberForm } from './details-item-invite-form'
import { DetailsItemInviteTable } from './details-item-invite-table'

export function DetailsItemInvite() {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center gap-6">
        <CardTitle>Convidar um membro</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <Separator />

        <div className="flex justify-between items-start gap-6">
          {/* LEFTSIDE */}
          <div className="flex flex-1 flex-col gap-6">
            <p className="text-base text-muted-foreground">
              Insira o e-mail de um usuário para convidar-lo para este
              workspace.
            </p>

            {/* WORKSPACE NAME */}
            <div className="w-fit flex justify-center items-center bg-primary/10 border border-primary/25 rounded-full px-3 py-1">
              <span className="inline-block font-semibold text-xs text-primary uppercase leading-none tracking-widest">
                Viagem para Gramado
              </span>
            </div>

            <DetailsItemInviteMemberForm />
          </div>

          {/* RIGHTSIDE */}
          <div className="flex flex-col flex-1">
            <DetailsItemInviteTable />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
