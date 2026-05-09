import { Pie, PieChart } from 'recharts'

import { Card, CardContent } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'A donut chart'

const chartData = (monthlyDistribution: {
  income: number
  expense: number
  investment: number
}) => [
  {
    type: 'Receitas',
    percent: monthlyDistribution.income,
    fill: 'oklch(0.723 0.219 149.579)',
  },
  {
    type: 'Despesas',
    percent: monthlyDistribution.expense,
    fill: 'oklch(0.637 0.237 25.331)',
  },
  {
    type: 'Investimentos',
    percent: monthlyDistribution.investment,
    fill: 'oklch(0.623 0.214 259.815)',
  },
]

const chartConfig = {
  percent: {
    label: 'Percentual',
  },
  income: {
    label: 'Receita',
    color: 'var(--chart-1)',
  },
  expense: {
    label: 'Despesas',
    color: 'var(--chart-2)',
  },
  investiment: {
    label: 'Investimentos',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig

type DashboardCardChartItemProps = {
  monthlyDistribution: { income: number; expense: number; investment: number }
}

export function DashboardCardChartItem({
  monthlyDistribution,
}: DashboardCardChartItemProps) {
  return (
    <Card className="flex flex-col p-0 shadow-none border-none">
      <CardContent className="flex-1 p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full min-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData(monthlyDistribution)}
              dataKey="percent"
              nameKey="type"
              innerRadius={72}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
