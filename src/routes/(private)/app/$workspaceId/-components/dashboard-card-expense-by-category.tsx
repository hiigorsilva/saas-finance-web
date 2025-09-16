import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { currencyFormat } from '@/utils/currency-format'
import { percentFormat } from '@/utils/percent-format'

export function DashboardCardExpenseByCategory() {
  return (
    <Card>
      <CardHeader className="gap-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-center">Gasto por categoria</CardTitle>
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="w-full flex flex-col gap-2">
          {/* TITLE AND PERCENT */}
          <div className="flex justify-between items-center gap-6">
            <h3 className="font-semibold text-base text-foreground leading-none">
              Moradia
            </h3>
            <span className="inline-block font-semibold text-base text-foreground leading-none">
              {percentFormat(48)}
            </span>
          </div>

          {/* PROGRESS */}
          <div className="w-full border rounded-full overflow-hidden">
            <div
              className="h-1.5 bg-primary rounded-full"
              style={{ width: '33%' }}
            />
          </div>

          {/* TITLE AND PERCENT */}
          <div className="flex justify-between items-center gap-6">
            <span className="inline-block font-normal text-sm text-muted-foreground leading-none">
              {currencyFormat(1200)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
