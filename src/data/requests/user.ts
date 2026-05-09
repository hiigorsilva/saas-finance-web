import type { FinancialProfileType } from '../labels/financial-profile'

export type User = {
  id: string
  name: string
  email: string
  password: string
  financialProfile: FinancialProfileType
  birthDate: Date | undefined
  updatedAt: Date
  createdAt: Date
  deletedAt: Date | null
}

const user: User = {
  id: 'user1',
  name: 'Higor Silva',
  email: 'higor@gmail.com',
  password: 'senha12345678',
  financialProfile: 'DEBTOR',
  birthDate: undefined,
  updatedAt: new Date(),
  createdAt: new Date(),
  deletedAt: null,
}

export const userResponse = {
  statusCode: 200,
  body: {
    data: user,
  },
}
