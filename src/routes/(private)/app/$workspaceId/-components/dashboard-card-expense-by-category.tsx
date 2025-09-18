import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { ExpenseByCategoryType } from '@/data/requests/expense-by-category'
import { DashboardCardExpenseByCategoryEmpty } from './dashboard-card-expense-by-category-empty'
import { DashboardCardExpenseByCategoryItem } from './dashboard-card-expense-by-category-item'

type DashboardCardExpenseByCategoryProps = {
  expenseByCategory: ExpenseByCategoryType[]
}

export function DashboardCardExpenseByCategory({
  expenseByCategory,
}: DashboardCardExpenseByCategoryProps) {
  return (
    <Card className="flex flex-col flex-auto">
      <CardHeader className="gap-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-center">Gasto por categoria</CardTitle>
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-auto flex-col gap-4">
        {expenseByCategory.length > 0 &&
          expenseByCategory.map(item => (
            <DashboardCardExpenseByCategoryItem key={item.name} item={item} />
          ))}

        {expenseByCategory.length === 0 && (
          <DashboardCardExpenseByCategoryEmpty>
            Nenhum gasto realizado este mês
          </DashboardCardExpenseByCategoryEmpty>
        )}
      </CardContent>
    </Card>
  )
}
