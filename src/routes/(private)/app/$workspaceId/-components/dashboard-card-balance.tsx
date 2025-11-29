import {
  ArrowUpIcon,
  DollarSignIcon,
  EyeIcon,
  EyeOffIcon,
  PlusIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { currencyFormat } from '@/utils/currency-format'
import { percentFormat } from '@/utils/percent-format'
import { DashboardAddTransactionButton } from './dashboard-add-transaction-button'
import { DashboardCardIcon } from './dashboard-card-icon'

type DashBoardCardBalanceProps = {
  showAmount: boolean
  showAmountSwitch: React.Dispatch<React.SetStateAction<boolean>>
}

export function DashBoardCardBalance({
  showAmount,
  showAmountSwitch,
}: DashBoardCardBalanceProps) {
  const handleShowAmountSwitch = () => {
    showAmountSwitch(prevState => !prevState)
  }

  return (
    <Card>
      <CardContent className="flex justify-between items-center gap-6">
        {/* DATA AMOUNT */}
        <div className="flex flex-col gap-2">
          {/* LABEL */}
          <div className="flex justify-between items-center gap-6">
            <div className="flex justify-start items-center gap-2">
              <DashboardCardIcon>
                <DollarSignIcon
                  className="size-5 shrink-0 text-primary"
                  strokeWidth={2}
                />
              </DashboardCardIcon>

              <h2 className="font-normal text-sm text-muted-foreground leading-none tracking-tight">
                Saldo
              </h2>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleShowAmountSwitch}
            >
              {!showAmount && (
                <EyeIcon
                  className="size-5 shrink-0 text-foreground"
                  strokeWidth={2}
                />
              )}

              {showAmount && (
                <EyeOffIcon
                  className="size-5 shrink-0 text-foreground"
                  strokeWidth={2}
                />
              )}
            </Button>
          </div>

          {/* AMOUNT */}
          <div className="flex flex-col gap-2">
            <strong className="inline-block font-semibold text-xl text-foreground leading-none tracking-tight">
              {!showAmount && currencyFormat(5200)}
              {showAmount && 'R$ ******'}
            </strong>

            <div className="flex justify-start items-center gap-2">
              <div className="w-fit h-fit flex justify-center items-center gap-1 text-xs text-green-500 bg-green-500/10 border border-green-500/25 rounded-full pl-1.5 pr-2 py-0.5">
                <ArrowUpIcon className="size-3 shrink-0 text-green-500" />
                {percentFormat(1.47)}
              </div>
              <span className="inline-block font-normal text-xs text-muted-foreground leading-none">
                em relação ao mês anterior
              </span>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <DashboardAddTransactionButton>
          <Button variant="gradient">
            Nova Transação
            <PlusIcon className="size-4 shrink-0 text-foreground" />
          </Button>
        </DashboardAddTransactionButton>
      </CardContent>
    </Card>
  )
}
