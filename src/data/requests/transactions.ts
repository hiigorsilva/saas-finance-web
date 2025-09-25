import { TRANSACTION_CATEGORY_TYPE } from '../labels/transaction-category'
import type { TransactionPaymentMethodValuesType } from '../labels/transaction-payment-method'
import type { TransactionTypeValuesType } from '../labels/transaction-type'

export type TransactionType = {
  id: string
  workspaceId: string
  createdByUserId: string
  name: string
  description: string
  type: TransactionTypeValuesType
  category: string
  amount: string
  paymentDate: string
  paymentMethod: TransactionPaymentMethodValuesType
  isRecurring: boolean
  recurringInterval: null
  recurringEndDate: null
  installmentTotal: null
  currentInstallment: null
  createdAt: string
  updatedAt: string
}

const transaction = [
  {
    id: 'transaction_id',
    workspaceId: 'buncker_id',
    createdByUserId: 'user_id',
    name: 'Combustível',
    description: 'Enchi o tanque do carro',
    type: 'EXPENSE' as TransactionType['type'],
    category: TRANSACTION_CATEGORY_TYPE.TRANSPORTATION,
    amount: '147.10',
    paymentDate: '2025-09-10T05:47:32',
    paymentMethod: 'CASH' as TransactionType['paymentMethod'],
    isRecurring: false,
    recurringInterval: null,
    recurringEndDate: null,
    installmentTotal: null,
    currentInstallment: null,
    createdAt: '2025-09-10T05:47:32',
    updatedAt: '2025-09-10T05:47:32',
  },
  {
    id: 'transaction_id_2',
    workspaceId: 'buncker_id',
    createdByUserId: 'user_id',
    name: 'Café da manhã em lanchonete',
    description: '4 Pão de queijo com 1 copo de café',
    type: 'EXPENSE' as TransactionType['type'],
    category: TRANSACTION_CATEGORY_TYPE.FOOD,
    amount: '147.10',
    paymentDate: '2025-09-24T07:31:40',
    paymentMethod: 'PIX' as TransactionType['paymentMethod'],
    isRecurring: false,
    recurringInterval: null,
    recurringEndDate: null,
    installmentTotal: null,
    currentInstallment: null,
    createdAt: '2025-09-24T007:31:58',
    updatedAt: '2025-09-24T007:31:58',
  },
  {
    id: 'transaction_id_3',
    workspaceId: 'buncker_id',
    createdByUserId: 'user_id',
    name: 'Freelancer de Landing Page',
    description: 'Criação de 2 Landing Pages',
    type: 'INCOME' as TransactionType['type'],
    paymentMethod: 'BANK_SLIP' as TransactionType['paymentMethod'],
    category: TRANSACTION_CATEGORY_TYPE.SALARY,
    amount: '2780',
    paymentDate: '2025-09-04T19:07:02',
    isRecurring: false,
    recurringInterval: null,
    recurringEndDate: null,
    installmentTotal: null,
    currentInstallment: null,
    createdAt: '2025-09-04T19:07:02',
    updatedAt: '2025-09-04T19:07:02',
  },
  {
    id: 'transaction_id_4',
    workspaceId: 'buncker_id',
    createdByUserId: 'user_id',
    name: 'Compra de Bitcoin',
    description: 'Comprei R$ 5 mil em Bitcoin',
    type: 'INVESTMENT' as TransactionType['type'],
    category: TRANSACTION_CATEGORY_TYPE.INVESTMENT,
    amount: '2780',
    paymentDate: '2025-09-04T19:07:02',
    paymentMethod: 'CREDIT_CARD' as TransactionType['paymentMethod'],
    isRecurring: false,
    recurringInterval: null,
    recurringEndDate: null,
    installmentTotal: null,
    currentInstallment: null,
    createdAt: '2025-09-04T19:07:02',
    updatedAt: '2025-09-04T19:07:02',
  },
]

export const transactionResponse = {
  statusCode: 200,
  body: {
    data: transaction,
    totalCount: transaction.length,
    totalPages: 3,
    currentPage: 1,
    limit: 10,
  },
}
