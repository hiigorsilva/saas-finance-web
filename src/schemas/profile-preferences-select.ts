import z from 'zod'
import {
  PROFILE_CURRENCY_TYPE_VALUES,
  PROFILE_LANGUAGE_TYPE_VALUES,
} from '@/data/labels/profile-preference'

export const profilePreferencesSelectSchema = z.object({
  currency: z.enum(PROFILE_CURRENCY_TYPE_VALUES),
  language: z.enum(PROFILE_LANGUAGE_TYPE_VALUES),
})

export type ProfilePreferencesSelectType = z.infer<
  typeof profilePreferencesSelectSchema
>
