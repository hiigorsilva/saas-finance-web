import { zodResolver } from '@hookform/resolvers/zod'
import { type ComponentProps, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  type FinancialProfileAnswerType,
  financialProfileAnswerSchema,
} from '@/schemas/financial-profile-form'
import { steps } from '../-data/financial-profile-steps'

type ProfileFinancialTextFormProps = ComponentProps<'div'>

export function ProfileFinancialTextForm({
  children,
}: ProfileFinancialTextFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)

  const form = useForm<FinancialProfileAnswerType>({
    resolver: zodResolver(financialProfileAnswerSchema),
  })

  const currentStep = steps[currentStepIndex]
  const isLastStep = currentStepIndex === steps.length - 1

  const onSubmit = async (data: FinancialProfileAnswerType) => {
    console.log('FINANCIAL_PROFILE', data)
    setOpenDialog(false)
  }

  const handleCancelForm = () => {
    form.reset()
    setOpenDialog(false)
  }

  const handlePreviousStep = () => {
    if (currentStepIndex === 0) {
      return
    }
    setCurrentStepIndex(prevState => prevState - 1)
  }

  const handleNextStep = () => {
    form.trigger(currentStep.nameStep).then(isValid => {
      if (isValid) {
        setCurrentStepIndex(prevState => prevState + 1)
      }
    })
  }

  const isCurrentStepValid =
    form.watch(currentStep.nameStep) !== undefined &&
    form.watch(currentStep.nameStep) !== ''

  const progressBar = ((currentStepIndex + 1) / steps.length) * 100

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Teste de Perfil Financeiro
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-2">
          {/* BAR */}
          <div className="w-full h-3 border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded transition-all"
              style={{ width: `${progressBar}%` }}
            />
          </div>

          {/* PERCENTAGE */}
          <span className="text-sm text-muted-foreground">{progressBar}%</span>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-10"
          >
            <FormField
              control={form.control}
              name={currentStep.nameStep}
              render={({ field }) => (
                <FormItem className="relative space-y-3">
                  <FormLabel>{currentStep.title}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      required
                    >
                      {currentStep.questions.map(question => (
                        <FormItem
                          key={question}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={question} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {question}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="absolute -bottom-5 left-0" />
                </FormItem>
              )}
            />

            {/* ACTIONS */}
            <div className="flex justify-between items-center gap-4">
              {currentStepIndex > 0 && (
                <Button
                  className="flex-1"
                  type="button"
                  variant="outline"
                  onClick={handlePreviousStep}
                >
                  Voltar
                </Button>
              )}

              {currentStepIndex === 0 && (
                <Button
                  className="flex-1"
                  type="button"
                  variant="outline"
                  onClick={handleCancelForm}
                >
                  Cancelar
                </Button>
              )}

              {isLastStep ? (
                <Button
                  className="flex-1"
                  type="submit"
                  variant="gradient"
                  disabled={!isCurrentStepValid}
                >
                  Concluir teste
                </Button>
              ) : (
                <Button
                  className="flex-1"
                  type="button"
                  variant="gradient"
                  onClick={handleNextStep}
                  disabled={!isCurrentStepValid}
                >
                  Próximo
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
