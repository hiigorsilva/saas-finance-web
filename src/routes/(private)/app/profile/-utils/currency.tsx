import { BrazilFlag } from '@/assets/flags/brazil-flag'
import {
  PROFILE_CURRENCY_TYPE,
  PROFILE_CURRENCY_TYPE_LABELS,
} from '@/data/labels/profile-preference'

export const currencyFlagTypeSelect = (currency: string) => {
  switch (currency) {
    case PROFILE_CURRENCY_TYPE.BRL:
      return <BrazilFlag className="size-[1.125rem] shrink-0" />

    default:
      return <BrazilFlag className="size-[1.125rem] shrink-0" />
  }
}

export const currencyTypeTranslate = (currency: string) => {
  switch (currency) {
    case PROFILE_CURRENCY_TYPE.BRL:
      return PROFILE_CURRENCY_TYPE_LABELS[PROFILE_CURRENCY_TYPE.BRL]

    default:
      return PROFILE_CURRENCY_TYPE_LABELS[PROFILE_CURRENCY_TYPE.BRL]
  }
}
