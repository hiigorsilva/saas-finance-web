import type { FinancialProfileType } from '../labels/financial-profile'

export type UserFinancialProfileType = {
  financialProfile: FinancialProfileType | null
}

export const financialProfile: UserFinancialProfileType = {
  financialProfile: 'DEBTOR',
}

export const financialProfileResponse = {
  statusCode: 200,
  body: {
    data: financialProfile,
  },
}
