export function percentFormat(value: number | string) {
  const parseValue = Number(value) / 100

  return Intl.NumberFormat('pt-BR', {
    style: 'percent',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    minimumIntegerDigits: 1,
  }).format(parseValue)
}
