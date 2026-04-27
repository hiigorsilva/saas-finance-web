import { format, formatDistanceToNow, isBefore } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function dateFormat(date: Date | string) {
  const parseDate = new Date(date)

  return format(parseDate, 'PP', {
    locale: ptBR,
  })
}

export function dateFormatLong(date: Date | string) {
  const parseDate = new Date(date)

  return format(parseDate, 'PPP', {
    locale: ptBR,
  })
}

export function dateFormatDistanceToNow(date: Date | string) {
  const parseDate = new Date(date)

  const periodValue = formatDistanceToNow(parseDate, {
    addSuffix: true,
    locale: ptBR,
  })
  return periodValue
}

export function dateIsBeforeToday(date: Date | string) {
  const parseDate = new Date(date)
  const today = new Date()

  return isBefore(parseDate, today)
}
