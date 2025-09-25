import {
  FINANCIAL_PROFILE_LABELS,
  FINANCIAL_PROFILE_TYPE,
} from '@/data/labels/financial-profile'

export const financialProfileTypeTranslate = (
  financialProfileType: string | null
) => {
  switch (financialProfileType) {
    case FINANCIAL_PROFILE_TYPE.DEBTOR:
      return FINANCIAL_PROFILE_LABELS[FINANCIAL_PROFILE_TYPE.DEBTOR]

    case FINANCIAL_PROFILE_TYPE.DETACHED:
      return FINANCIAL_PROFILE_LABELS[FINANCIAL_PROFILE_TYPE.DETACHED]

    case FINANCIAL_PROFILE_TYPE.INVESTOR:
      return FINANCIAL_PROFILE_LABELS[FINANCIAL_PROFILE_TYPE.INVESTOR]

    case FINANCIAL_PROFILE_TYPE.SAVER:
      return FINANCIAL_PROFILE_LABELS[FINANCIAL_PROFILE_TYPE.SAVER]

    case FINANCIAL_PROFILE_TYPE.SPENDER:
      return FINANCIAL_PROFILE_LABELS[FINANCIAL_PROFILE_TYPE.SPENDER]

    default:
      return 'Outro'
  }
}

export const financialProfileDescritionTypeTranslate = (
  financialProfileType: string | null
) => {
  switch (financialProfileType) {
    case FINANCIAL_PROFILE_TYPE.DEBTOR:
      return 'Tem o hábito de economizar parte de sua renda regularmente, prioriza a economia, mantendo um orçamento equilibrado e pensa bastante antes de comprar.'

    case FINANCIAL_PROFILE_TYPE.DETACHED:
      return 'Não acompanha seus gastos nem investimentos, mantém pouca atenção ao controle financeiro ou planejamento.'

    case FINANCIAL_PROFILE_TYPE.INVESTOR:
      return 'Busca oportunidades para aplicar dinheiro, foca em crescimento patrimonial e diversificação de investimentos.'

    case FINANCIAL_PROFILE_TYPE.SAVER:
      return 'Sempre reserva uma parte da renda para o futuro, cria reservas financeiras e evita gastos desnecessários.'

    case FINANCIAL_PROFILE_TYPE.SPENDER:
      return 'Gasta com frequência e prefere o consumo imediato, costuma não planejar o orçamento, priorizando desejos no momento.'

    default:
      return 'Nenhum perfil identificado: Você não realizou o teste para descobrir qual o tipo de perfil financeiro melhor se enquadra para você.'
  }
}
