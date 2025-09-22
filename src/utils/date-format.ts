import { format } from 'date-fns'
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
