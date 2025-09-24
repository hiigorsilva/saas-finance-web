// CURRENCY
export const PROFILE_CURRENCY_TYPE = {
  BRL: 'BRL',
} as const

export const PROFILE_CURRENCY_TYPE_LABELS = {
  [PROFILE_CURRENCY_TYPE.BRL]: 'R$ - Real Brasileiro',
}

export const PROFILE_CURRENCY_TYPE_VALUES = Object.values(PROFILE_CURRENCY_TYPE)

export type ProfileCurrencyType =
  (typeof PROFILE_CURRENCY_TYPE)[keyof typeof PROFILE_CURRENCY_TYPE]

// LANGUAGE
export const PROFILE_LANGUAGE_TYPE = {
  PT_BR: 'PT_BR',
} as const

export const PROFILE_LANGUAGE_TYPE_LABELS = {
  [PROFILE_LANGUAGE_TYPE.PT_BR]: 'Português PT-BR',
}

export const PROFILE_LANGUAGE_TYPE_VALUES = Object.values(PROFILE_LANGUAGE_TYPE)

export type ProfileLanguageType =
  (typeof PROFILE_LANGUAGE_TYPE)[keyof typeof PROFILE_LANGUAGE_TYPE]
