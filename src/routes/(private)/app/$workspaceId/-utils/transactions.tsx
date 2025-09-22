import { BanknoteIcon, BarcodeIcon, CreditCardIcon } from 'lucide-react'
import { PixIcon } from '@/assets/icons/pix'
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_CATEGORY_TYPE,
} from '@/data/labels/transaction-category'
import {
  TRANSACTION_PAYMENT_METHOD_LABELS,
  TRANSACTION_PAYMENT_METHOD_TYPE,
} from '@/data/labels/transaction-payment-method'
import {
  TRANSACTION_RECURRING_INTERVAL_TYPE,
  TRANSACTION_RECURRING_INTERVAL_TYPE_LABELS,
} from '@/data/labels/transaction-recurring-interval'
import {
  TRANSACTION_STATUS_LABELS,
  TRANSACTION_STATUS_TYPE,
} from '@/data/labels/transaction-status'
import {
  TRANSACTION_TYPE,
  TRANSACTION_TYPE_LABELS,
} from '@/data/labels/transaction-type'

export const transactionTypeColor = (transactionType: string) => {
  switch (transactionType) {
    case TRANSACTION_TYPE.INCOME:
      return 'text-green-500'

    case TRANSACTION_TYPE.EXPENSE:
      return 'text-red-500'

    case TRANSACTION_TYPE.INVESTMENT:
      return 'text-blue-500'

    default:
      return 'text-foreground'
  }
}

export const transactionTypeTranslate = (transactionType: string) => {
  switch (transactionType) {
    case TRANSACTION_TYPE.INCOME:
      return TRANSACTION_TYPE_LABELS[TRANSACTION_TYPE.INCOME]

    case TRANSACTION_TYPE.EXPENSE:
      return TRANSACTION_TYPE_LABELS[TRANSACTION_TYPE.EXPENSE]

    case TRANSACTION_TYPE.INVESTMENT:
      return TRANSACTION_TYPE_LABELS[TRANSACTION_TYPE.INVESTMENT]

    default:
      return 'Outro'
  }
}

export const transactionIconByPaymentMethod = (transactionType: string) => {
  switch (transactionType) {
    case TRANSACTION_PAYMENT_METHOD_TYPE.CREDIT_CARD:
      return (
        <CreditCardIcon
          className="size-5 shrink-0 text-primary"
          strokeWidth={1.5}
        />
      )

    case TRANSACTION_PAYMENT_METHOD_TYPE.DEBEIT_CARD:
      return (
        <CreditCardIcon
          className="size-5 shrink-0 text-primary"
          strokeWidth={1.5}
        />
      )

    case TRANSACTION_PAYMENT_METHOD_TYPE.BANK_SLIP:
      return (
        <BarcodeIcon
          className="size-5 shrink-0 text-primary"
          strokeWidth={1.5}
        />
      )

    case TRANSACTION_PAYMENT_METHOD_TYPE.CASH:
      return (
        <BanknoteIcon
          className="size-5 shrink-0 text-primary"
          strokeWidth={1.5}
        />
      )

    case TRANSACTION_PAYMENT_METHOD_TYPE.PIX:
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

export const transactionCategoryTranslate = (transactionCategory: string) => {
  switch (transactionCategory) {
    case TRANSACTION_CATEGORY_TYPE.HOUSING:
      return TRANSACTION_CATEGORY_LABELS[TRANSACTION_CATEGORY_TYPE.HOUSING]

    case TRANSACTION_CATEGORY_TYPE.PERSONAL_CARE:
      return TRANSACTION_CATEGORY_LABELS[
        TRANSACTION_CATEGORY_TYPE.PERSONAL_CARE
      ]

    case TRANSACTION_CATEGORY_TYPE.TRANSPORTATION:
      return TRANSACTION_CATEGORY_LABELS[
        TRANSACTION_CATEGORY_TYPE.TRANSPORTATION
      ]

    case TRANSACTION_CATEGORY_TYPE.FOOD:
      return TRANSACTION_CATEGORY_LABELS[TRANSACTION_CATEGORY_TYPE.FOOD]

    case TRANSACTION_CATEGORY_TYPE.GROCERIES:
      return TRANSACTION_CATEGORY_LABELS[TRANSACTION_CATEGORY_TYPE.GROCERIES]

    case TRANSACTION_CATEGORY_TYPE.ENTERTAINMENT:
      return TRANSACTION_CATEGORY_LABELS[
        TRANSACTION_CATEGORY_TYPE.ENTERTAINMENT
      ]

    case TRANSACTION_CATEGORY_TYPE.INVESTMENT:
      return TRANSACTION_CATEGORY_LABELS[TRANSACTION_CATEGORY_TYPE.INVESTMENT]

    case TRANSACTION_CATEGORY_TYPE.FAMILY:
      return TRANSACTION_CATEGORY_LABELS[TRANSACTION_CATEGORY_TYPE.FAMILY]

    case TRANSACTION_CATEGORY_TYPE.WORK:
      return TRANSACTION_CATEGORY_LABELS[TRANSACTION_CATEGORY_TYPE.WORK]

    case TRANSACTION_CATEGORY_TYPE.HEALTH:
      return TRANSACTION_CATEGORY_LABELS[TRANSACTION_CATEGORY_TYPE.HEALTH]

    case TRANSACTION_CATEGORY_TYPE.UTILITY:
      return TRANSACTION_CATEGORY_LABELS[TRANSACTION_CATEGORY_TYPE.UTILITY]

    case TRANSACTION_CATEGORY_TYPE.SALARY:
      return TRANSACTION_CATEGORY_LABELS[TRANSACTION_CATEGORY_TYPE.SALARY]

    case TRANSACTION_CATEGORY_TYPE.OTHER:
      return TRANSACTION_CATEGORY_LABELS[TRANSACTION_CATEGORY_TYPE.OTHER]

    default:
      return 'Outro'
  }
}

export const transactionPaymentMethodTranslate = (
  transactionPaymentMethod: string
) => {
  switch (transactionPaymentMethod) {
    case TRANSACTION_PAYMENT_METHOD_TYPE.CREDIT_CARD:
      return TRANSACTION_PAYMENT_METHOD_LABELS[
        TRANSACTION_PAYMENT_METHOD_TYPE.CREDIT_CARD
      ]

    case TRANSACTION_PAYMENT_METHOD_TYPE.DEBEIT_CARD:
      return TRANSACTION_PAYMENT_METHOD_LABELS[
        TRANSACTION_PAYMENT_METHOD_TYPE.DEBEIT_CARD
      ]

    case TRANSACTION_PAYMENT_METHOD_TYPE.BANK_SLIP:
      return TRANSACTION_PAYMENT_METHOD_LABELS[
        TRANSACTION_PAYMENT_METHOD_TYPE.BANK_SLIP
      ]

    case TRANSACTION_PAYMENT_METHOD_TYPE.CASH:
      return TRANSACTION_PAYMENT_METHOD_LABELS[
        TRANSACTION_PAYMENT_METHOD_TYPE.CASH
      ]

    case TRANSACTION_PAYMENT_METHOD_TYPE.PIX:
      return TRANSACTION_PAYMENT_METHOD_LABELS[
        TRANSACTION_PAYMENT_METHOD_TYPE.PIX
      ]

    default:
      return TRANSACTION_PAYMENT_METHOD_LABELS[
        TRANSACTION_PAYMENT_METHOD_TYPE.OTHER
      ]
  }
}

export const transactionTypeBulletColor = (transactionType: string) => {
  switch (transactionType) {
    case TRANSACTION_TYPE.INCOME:
      return 'bg-green-500'

    case TRANSACTION_TYPE.EXPENSE:
      return 'bg-red-500'

    case TRANSACTION_TYPE.INVESTMENT:
      return 'bg-blue-500'

    default:
      return 'text-foreground'
  }
}

export const transactionTypeBadgeColor = (transactionType: string) => {
  switch (transactionType) {
    case TRANSACTION_TYPE.INCOME:
      return 'bg-green-500/10 text-green-500 border-green-500/20'

    case TRANSACTION_TYPE.EXPENSE:
      return 'bg-red-500/10 text-red-500 border-red-500/20'

    case TRANSACTION_TYPE.INVESTMENT:
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20'

    default:
      return 'text-foreground'
  }
}

export const transactionStatusBadgeColor = (transactionStatus: string) => {
  switch (transactionStatus) {
    case TRANSACTION_STATUS_TYPE.ACTIVE:
      return 'bg-green-500/10 border-green-500/25'

    case TRANSACTION_STATUS_TYPE.INACTIVE:
      return 'bg-zinc-400/10 border-zinc-400/25'

    default:
      return 'bg-transparent border-foreground/25'
  }
}

export const transactionStatusBulletColor = (transactionStatus: string) => {
  switch (transactionStatus) {
    case TRANSACTION_STATUS_TYPE.ACTIVE:
      return 'bg-green-500'

    case TRANSACTION_STATUS_TYPE.INACTIVE:
      return 'bg-zinc-400'

    default:
      return 'bg-foreground'
  }
}

export const transactionStatusTranslate = (transactionStatus: string) => {
  switch (transactionStatus) {
    case TRANSACTION_STATUS_TYPE.ACTIVE:
      return TRANSACTION_STATUS_LABELS[TRANSACTION_STATUS_TYPE.ACTIVE]

    case TRANSACTION_STATUS_TYPE.INACTIVE:
      return TRANSACTION_STATUS_LABELS[TRANSACTION_STATUS_TYPE.INACTIVE]

    default:
      return 'Outro'
  }
}

export const transactionRecurringIntervalTranslate = (
  transactionInterval: string
) => {
  switch (transactionInterval) {
    case TRANSACTION_RECURRING_INTERVAL_TYPE.DAILY:
      return TRANSACTION_RECURRING_INTERVAL_TYPE_LABELS[
        TRANSACTION_RECURRING_INTERVAL_TYPE.DAILY
      ]

    case TRANSACTION_RECURRING_INTERVAL_TYPE.WEEKLY:
      return TRANSACTION_RECURRING_INTERVAL_TYPE_LABELS[
        TRANSACTION_RECURRING_INTERVAL_TYPE.WEEKLY
      ]

    case TRANSACTION_RECURRING_INTERVAL_TYPE.MONTHLY:
      return TRANSACTION_RECURRING_INTERVAL_TYPE_LABELS[
        TRANSACTION_RECURRING_INTERVAL_TYPE.MONTHLY
      ]

    case TRANSACTION_RECURRING_INTERVAL_TYPE.YEARLY:
      return TRANSACTION_RECURRING_INTERVAL_TYPE_LABELS[
        TRANSACTION_RECURRING_INTERVAL_TYPE.YEARLY
      ]

    default:
      return 'Outro'
  }
}
