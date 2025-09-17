import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
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

  const initialMonth = cleanSearchValue(search.month, monthFormatted)
  const initialYear = cleanSearchValue(search.year, yearFormatted)

  // Estado interno para o mês e ano selecionados, iniciados do search params
  const [selectedMonth, setSelectedMonth] = useState(initialMonth)
  const [selectedYear, setSelectedYear] = useState(initialYear)

  // Atualizar o estado quando o search mudar (ex: navegação externa)
  useEffect(() => {
    setSelectedMonth(initialMonth)
    setSelectedYear(initialYear)
  }, [initialMonth, initialYear])

  useEffect(() => {
    if (
      Number(selectedYear) === currentYear &&
      Number(selectedMonth) > currentMonth
    ) {
      // Ajusta mês para o mês atual se estiver no futuro
      setSelectedMonth(monthFormatted)
      // Também atualiza a URL para refletir essa mudança
      router({
        to: '.',
        search: { month: monthFormatted, year: selectedYear },
        replace: true,
      })
    }
  }, [
    selectedYear,
    currentMonth,
    currentYear,
    monthFormatted,
    router,
    selectedMonth,
  ])

  const yearsOptions = Array.from({ length: 10 }).map((_, index) => {
    const year = currentYear - index
    return {
      value: String(year),
      label: String(year),
    }
  })

  const handleMonthChange = (monthSelected: string) => {
    setSelectedMonth(monthSelected)
    router({
      to: '.',
      search: { month: monthSelected, year: selectedYear },
      replace: true,
    })
  }

  const handleYearChange = (yearSelected: string) => {
    setSelectedYear(yearSelected)
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
        <SelectTrigger className="font-semibold min-w-32 w-fit">
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
        <SelectTrigger className="font-semibold min-w-24 w-fit">
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
