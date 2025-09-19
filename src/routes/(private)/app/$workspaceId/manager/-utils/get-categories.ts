import {
  TRANSACTION_CATEGORY_TYPE,
  transactionCategoryItems,
} from '@/data/labels/transaction-category'

export const getTransactionCategoryCard = (
  categoryType: string
): { title: string; description: string } => {
  switch (categoryType) {
    case TRANSACTION_CATEGORY_TYPE.FOOD:
    case TRANSACTION_CATEGORY_TYPE.HOUSING:
    case TRANSACTION_CATEGORY_TYPE.TRANSPORTATION:
    case TRANSACTION_CATEGORY_TYPE.UTILITY:
    case TRANSACTION_CATEGORY_TYPE.HEALTH:
    case TRANSACTION_CATEGORY_TYPE.ENTERTAINMENT:
    case TRANSACTION_CATEGORY_TYPE.GROCERIES:
    case TRANSACTION_CATEGORY_TYPE.SALARY:
    case TRANSACTION_CATEGORY_TYPE.WORK:
    case TRANSACTION_CATEGORY_TYPE.FAMILY:
    case TRANSACTION_CATEGORY_TYPE.INVESTMENT:
    case TRANSACTION_CATEGORY_TYPE.PERSONAL_CARE:
    case TRANSACTION_CATEGORY_TYPE.OTHER:
      return {
        title: transactionCategoryItems[categoryType]?.title ?? '',
        description: transactionCategoryItems[categoryType]?.descrition ?? '',
      }

    default:
      return {
        title: transactionCategoryItems[TRANSACTION_CATEGORY_TYPE.OTHER].title,
        description:
          transactionCategoryItems[TRANSACTION_CATEGORY_TYPE.OTHER].descrition,
      }
  }
}
