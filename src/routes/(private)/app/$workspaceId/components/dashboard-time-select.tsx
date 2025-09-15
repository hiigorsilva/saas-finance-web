import { useNavigate } from '@tanstack/react-router'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MONTHS_OF_YEAR } from '@/data/date/month-select'

type DashboardTimeSelectProps = {
  search: {
    month?: string
    year?: string
  }
}

export function DashboardTimeSelect({ search }: DashboardTimeSelectProps) {
  const router = useNavigate()

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  // CURRENT DATE FORMATTED
  const monthFormatted = currentMonth.toString().padStart(2, '0')
  const yearFormatted = String(currentYear)

  function cleanSearchValue(value?: string, fallback: string = ''): string {
    if (!value) return fallback
    return value.replace(/^"+|"+$/g, '')
  }

  // SELECTED DATE
  const selectedMonth = cleanSearchValue(search.month, monthFormatted)
  const selectedYear = cleanSearchValue(search.year, yearFormatted)

  const yearsOptions = Array.from({ length: 10 }).map((_, index) => {
    const year = currentYear - index
    return {
      value: String(year),
      label: String(year),
    }
  })

  const handleMonthChange = (monthSelected: string) => {
    router({
      to: '.',
      search: { month: monthSelected, year: selectedYear },
      replace: true,
    })
  }

  const handleYearChange = (yearSelected: string) => {
    router({
      to: '.',
      search: { month: selectedMonth, year: yearSelected },
      replace: true,
    })
  }

  return (
    <div className="flex items-center gap-2">
      {/* SELECT MONTH */}
      <Select value={selectedMonth} onValueChange={handleMonthChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o mês" />
        </SelectTrigger>

        <SelectContent>
          {MONTHS_OF_YEAR.map(month => {
            const isDisabled =
              selectedYear === yearFormatted &&
              Number(month.value) > currentMonth

            return (
              <SelectItem
                key={month.value}
                value={month.value}
                disabled={isDisabled}
              >
                {month.label}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>

      {/* SELECT YEAR */}
      <Select value={selectedYear} onValueChange={handleYearChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o ano" />
        </SelectTrigger>

        <SelectContent>
          {yearsOptions.map(year => {
            return (
              <SelectItem key={year.value} value={year.value}>
                {year.label}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
