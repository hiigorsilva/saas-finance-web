import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronRightIcon, Loader2Icon } from 'lucide-react'
import { useState } from 'react'
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
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  type FinancialProfileAnswerType,
  financialProfileAnswerSchema,
} from '@/schemas/financial-profile-form'
import { steps } from '../-data/financial-profile-steps'

type ProfileFinancialDialogFormProps = {
  openFormClick: (open: boolean) => void
}

export function ProfileFinancialDialogForm({
  openFormClick,
}: ProfileFinancialDialogFormProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const form = useForm<FinancialProfileAnswerType>({
    resolver: zodResolver(financialProfileAnswerSchema),
    defaultValues: {
      stepOne: '',
      stepTwo: '',
      stepThree: '',
      stepFour: '',
    },
    mode: 'onChange',
  })

  const currentStepData = steps[currentStep]

  const answeredSteps = steps.filter(step => form.watch(step.nameStep)).length
  const progress = (answeredSteps / steps.length) * 100

  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  const currentAnswer = form.watch(currentStepData.nameStep)
  const isDisabledNextButton = !currentAnswer

  const handleNextStep = async () => {
    const fieldName = currentStepData.nameStep
    const isValid = await form.trigger(fieldName)

    if (isValid && !isLastStep) {
      setCurrentStep(prevState => prevState + 1)
    }
  }

  const handlePreviousStep = () => {
    if (!isFirstStep) {
      setCurrentStep(prevState => prevState - 1)
    }
  }

  const onSubmit = async (data: FinancialProfileAnswerType) => {
    console.log('FINANCIAL_PROFILE', data)

    await new Promise(resolve => setTimeout(resolve, 1000))

    openFormClick(false)
  }

  return (
    <>
      {/* PROGRESS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Pergunta {currentStep + 1} de {steps.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{currentStepData.title}</CardTitle>
          <CardDescription>{currentStepData.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name={currentStepData.nameStep}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        {currentStepData.questions.map(question => (
                          <FormLabel
                            key={question}
                            htmlFor={question}
                            className={`h-10 w-full font-normal flex items-center gap-3 rounded-lg border px-4 cursor-pointer transition ${field.value === question && 'bg-gradient-to-r from-yellow-200 to-yellow-400 hover:brightness-110'} ${field.value !== question && 'saturate-0 hover:bg-accent'}`}
                          >
                            <FormControl>
                              <RadioGroupItem
                                className="sr-only"
                                id={question}
                                value={question}
                              />
                            </FormControl>
                            {question}
                          </FormLabel>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between items-center gap-4">
                <Button
                  className="min-w-28 w-fit"
                  type="button"
                  variant="outline"
                  onClick={handlePreviousStep}
                  disabled={isFirstStep}
                >
                  Anterior
                </Button>

                {isLastStep ? (
                  <Button
                    className="min-w-28 w-fit"
                    type="submit"
                    variant="gradient"
                    disabled={
                      form.formState.isSubmitting || isDisabledNextButton
                    }
                  >
                    {form.formState.isSubmitting && (
                      <Loader2Icon className="size-4 shrink-0 text-foreground animate-spin" />
                    )}

                    {!form.formState.isSubmitting && (
                      <>
                        Enviar
                        <ChevronRightIcon className="size-4 shrink-0 text-foreground" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    className="min-w-28 w-fit"
                    type="button"
                    variant="gradient"
                    onClick={handleNextStep}
                    disabled={isDisabledNextButton}
                  >
                    Próximo
                    <ChevronRightIcon className="size-4 shrink-0 text-foreground" />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}
