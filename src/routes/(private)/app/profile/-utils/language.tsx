import { BrazilFlag } from '@/assets/flags/brazil-flag'
import {
  PROFILE_LANGUAGE_TYPE,
  PROFILE_LANGUAGE_TYPE_LABELS,
} from '@/data/labels/profile-preference'

export const languageFlagTypeSelect = (language: string) => {
  switch (language) {
    case PROFILE_LANGUAGE_TYPE.PT_BR:
      return <BrazilFlag className="size-[1.125rem] shrink-0" />

    default:
      return <BrazilFlag className="size-[1.125rem] shrink-0" />
  }
}

export const languageTypeTranslate = (language: string) => {
  switch (language) {
    case PROFILE_LANGUAGE_TYPE.PT_BR:
      return PROFILE_LANGUAGE_TYPE_LABELS[PROFILE_LANGUAGE_TYPE.PT_BR]

    default:
      return PROFILE_LANGUAGE_TYPE_LABELS[PROFILE_LANGUAGE_TYPE.PT_BR]
  }
}
