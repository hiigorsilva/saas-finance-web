const STORAGE_KEY = '@token'

export function getStorageToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(STORAGE_KEY)
}

export function setStorageToken(token: string) {
  localStorage.setItem(STORAGE_KEY, token)
}

export function removeStorageToken() {
  localStorage.removeItem(STORAGE_KEY)
}
