import type { FinancialProfileType } from '../-@types/financial-profile-type'

const stepOne: FinancialProfileType = {
  nameStep: 'stepOne',
  title: 'Como você se sente em relação as suas finanças hoje?',
  description: 'Ajuda a identificar o seu momento atual.',
  questions: [
    'Estou totalmente perdido',
    'Estou um pouco perdido',
    'Estou no controle, mas quero melhorar',
  ],
}

const stepTwo: FinancialProfileType = {
  nameStep: 'stepTwo',
  title: 'Qual o seu maior desafio hoje?',
  description: 'Ajuda a entender sua maior dificuldade no momento.',
  questions: [
    'Meus gastos são maiores que minha renda',
    'Não consigo economizar meu dinheiro',
    'Não consigo me organizar para quitar as dívidas',
  ],
}

const stepThree: FinancialProfileType = {
  nameStep: 'stepThree',
  title: 'Qual é o seu principal objetivo ao usar nosso app?',
  description: 'Ajuda a entender o seu objetivo.',
  questions: [
    'Quitar dívidas para ter tranquilidade',
    'Ter uma reserva de emergência',
    'Controlar meus gastos e ter mais consciência',
  ],
}

const stepFour: FinancialProfileType = {
  nameStep: 'stepFour',
  title: 'Qual sua faixa etária?',
  description: 'Ajuda a personalizar melhor seus insights.',
  questions: ['Até 25 anos', '26 a 40 anos', 'Acima de 40 anos'],
}

export const steps = [stepOne, stepTwo, stepThree, stepFour]
