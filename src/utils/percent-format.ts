export function percentFormat(value: number | string) {
  const parseValue = Number(value) / 100

  return Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseValue)
}
