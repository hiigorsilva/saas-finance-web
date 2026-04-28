export function percentFormat(value: number | string, precision = 2) {
  const parseValue = Number(value) / 100

  return Intl.NumberFormat('pt-BR', {
    style: 'percent',
    maximumFractionDigits: precision,
    minimumFractionDigits: precision,
  }).format(parseValue)
}
