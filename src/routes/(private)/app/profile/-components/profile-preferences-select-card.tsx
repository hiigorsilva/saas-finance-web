import { zodResolver } from '@hookform/resolvers/zod'
import { SaveIcon, UserCogIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  PROFILE_CURRENCY_TYPE_VALUES,
  PROFILE_LANGUAGE_TYPE_VALUES,
} from '@/data/labels/profile-preference'
import {
  type ProfilePreferencesSelectType,
  profilePreferencesSelectSchema,
} from '@/schemas/profile-preferences-select'
import {
  currencyFlagTypeSelect,
  currencyTypeTranslate,
} from '../-utils/currency'
import {
  languageFlagTypeSelect,
  languageTypeTranslate,
} from '../-utils/language'

export function ProfilePreferencesSelectCard() {
  const form = useForm<ProfilePreferencesSelectType>({
    resolver: zodResolver(profilePreferencesSelectSchema),
    defaultValues: {
      currency: 'BRL',
      language: 'PT_BR',
    },
  })

  const onSubmit = async (data: ProfilePreferencesSelectType) => {
    console.log('DATA_PREFERENCES', data)
  }

  return (
    <Card>
      <CardHeader className="flex flex-col h-fit">
        <CardTitle className="flex justify-start items-center gap-2 text-lg text-foreground">
          <UserCogIcon
            className="size-5 shrink-0 text-foreground"
            strokeWidth={1.5}
          />
          Minhas preferências
        </CardTitle>

        <CardDescription className="text-base text-muted-foreground">
          Selecione o tipo de preferência que você deseja usar na plataforma
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* CURRENCY */}
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="font-normal">Moeda</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={PROFILE_CURRENCY_TYPE_VALUES[0]}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full min-h-10">
                        <SelectValue
                          {...field}
                          placeholder="Selecionar moeda"
                        />
                      </SelectTrigger>

                      <SelectContent>
                        {PROFILE_CURRENCY_TYPE_VALUES.map(currency => (
                          <SelectItem key={currency} value={currency}>
                            {currencyFlagTypeSelect(currency)}{' '}
                            {currencyTypeTranslate(currency)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="absolute -bottom-5 left-0" />
                </FormItem>
              )}
            />

            {/* LANGUAGE */}
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="font-normal">Idioma</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={PROFILE_LANGUAGE_TYPE_VALUES[0]}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full min-h-10">
                        <SelectValue
                          placeholder="Selecionar idioma"
                          {...field}
                        />
                      </SelectTrigger>

                      <SelectContent>
                        {PROFILE_LANGUAGE_TYPE_VALUES.map(language => (
                          <SelectItem key={language} value={language}>
                            {languageFlagTypeSelect(language)}{' '}
                            {languageTypeTranslate(language)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="absolute -bottom-5 left-0" />
                </FormItem>
              )}
            />

            <Button variant="gradient" className="w-fit" disabled>
              <SaveIcon
                className="size-4 shrink-0 text-foreground"
                strokeWidth={1.5}
              />
              Salvar dados
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
