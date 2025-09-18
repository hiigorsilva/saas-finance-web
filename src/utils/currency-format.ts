export function currencyFormat(value: number | string) {
  const parseValue = Number(value)

  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(parseValue)
}
