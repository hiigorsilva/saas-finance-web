import { BanknoteIcon, BarcodeIcon, CreditCardIcon } from 'lucide-react'
import { PixIcon } from '@/assets/icons/pix'

export const handleTransactionTypeColor = (transactionType: string) => {
  switch (transactionType) {
    case 'INCOME':
      return 'text-green-500'

    case 'EXPENSE':
      return 'text-red-500'

    case 'INVESTIMENT':
      return 'text-blue-500'

    default:
      return 'text-foreground'
  }
}

export const handleTransactionTypeTranslate = (transactionType: string) => {
  switch (transactionType) {
    case 'INCOME':
      return 'Receita'

    case 'EXPENSE':
      return 'Despesa'

    case 'INVESTIMENT':
      return 'Investimento'

    default:
      return 'Outro'
  }
}

export const handleSetIconByPaymentMethod = (transactionType: string) => {
  switch (transactionType) {
    case 'CREDIT_CARD':
      return (
        <CreditCardIcon
          className="size-5 shrink-0 text-primary"
          strokeWidth={1.5}
        />
      )

    case 'DEBIT_CARD':
      return (
        <CreditCardIcon
          className="size-5 shrink-0 text-primary"
          strokeWidth={1.5}
        />
      )

    case 'BANK_SLIP':
      return (
        <BarcodeIcon
          className="size-5 shrink-0 text-primary"
          strokeWidth={1.5}
        />
      )

    case 'CASH':
      return (
        <BanknoteIcon
          className="size-5 shrink-0 text-primary"
          strokeWidth={1.5}
        />
      )

    case 'PIX':
      return (
        <PixIcon className="size-5 shrink-0 text-primary" strokeWidth={1.5} />
      )

    default:
      return (
        <BanknoteIcon
          className="size-5 shrink-0 text-primary"
          strokeWidth={1.5}
        />
      )
  }
}
