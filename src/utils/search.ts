export const MIN_SEARCH_LENGTH = 3

export function validateSearchTerm(search?: string | null) {
  if (typeof search !== 'string') return undefined

  const normalizedSearch = search.trim()

  if (!normalizedSearch) return undefined
  if (normalizedSearch.length < MIN_SEARCH_LENGTH) return undefined

  return normalizedSearch
}
