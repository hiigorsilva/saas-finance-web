import { Card } from '@/components/ui/card'
import type { TransactionCategoryValuesType } from '@/data/labels/transaction-category'
import { getTransactionCategoryCard } from '../-utils/get-categories'

type ManagerCategoryCardProps = {
  category: TransactionCategoryValuesType
}

export function ManagerCategoryCard({ category }: ManagerCategoryCardProps) {
  const { title, description } = getTransactionCategoryCard(category)

  return (
    <Card className="w-full h-full gap-2 px-4 py-4 rounded-md">
      <h3 className="font-semibold text-base text-foreground text-pretty">
        {title}
      </h3>
      <p className="font-normal text-sm text-muted-foreground text-pretty">
        {description}
      </p>
    </Card>
  )
}
