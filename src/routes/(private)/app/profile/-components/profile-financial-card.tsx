import { AtomIcon, SmilePlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { UserFinancialProfileType } from '@/schemas/user-financial-profile'
import {
  financialProfileDescritionTypeTranslate,
  financialProfileTypeTranslate,
} from '../-utils/financial-profile'

type ProfileFinancialCardProps = {
  profileType: UserFinancialProfileType
  openFormClick: (open: boolean) => void
}

export function ProfileFinancialCard({
  profileType,
  openFormClick,
}: ProfileFinancialCardProps) {
  const { financialProfile } = profileType

  const handleOpenFinancialProfileForm = () => {
    openFormClick(true)
  }

  return (
    <Card>
      <CardHeader className="flex flex-col h-fit">
        <CardTitle className="flex justify-start items-center gap-2 text-lg text-foreground">
          <SmilePlusIcon
            className="size-5 shrink-0 text-foreground"
            strokeWidth={1.5}
          />
          Teste de perfil financeiro
        </CardTitle>

        <CardDescription className="text-base text-muted-foreground">
          Faça o teste para descobrir qual o seu perfil financeiro
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 border border-primary/25 bg-primary/15 p-6 rounded-md">
          <h3 className="font-normal text-base text-foreground">
            Seu perfil:{' '}
            <strong className="font-semibold text-foreground">
              {financialProfileTypeTranslate(financialProfile)}
            </strong>
          </h3>

          <Separator className="border border-primary/25" />

          <p className="text-sm text-muted-foreground text-pretty">
            {financialProfileDescritionTypeTranslate(financialProfile)}
          </p>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          variant="gradient"
          className="w-fit"
          onClick={handleOpenFinancialProfileForm}
        >
          <AtomIcon
            className="size-4 shrink-0 text-foreground"
            strokeWidth={1.5}
          />
          {financialProfile && 'Refazer teste'}
          {!financialProfile && 'Iniciar teste'}
        </Button>
      </CardFooter>
    </Card>
  )
}
