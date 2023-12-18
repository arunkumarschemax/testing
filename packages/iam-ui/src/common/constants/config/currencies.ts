import { CurrencyTypeEnum } from "../../utils/interfaces";


export const currencies = {
  [CurrencyTypeEnum.USD]: {
    text: 'USD',
    icon: '$',
  },
  [CurrencyTypeEnum.BTC]: {
    text: 'BTC',
    icon: '₿',
  },
  [CurrencyTypeEnum.ETH]: {
    text: 'ETH',
    icon: 'Ξ',
  },
};
