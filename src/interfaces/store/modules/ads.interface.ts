export interface AdsAuthor {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ICurrency {
  inner: string;
  outer: string;
}

export interface IAd {
  id: number;
  price: string;
  paymentMethod: string;
  adsAuthor: AdsAuthor;
  availableValue: string;
  authorComment: string;
  priceToShow: string;
  currencyForBuy: string;
  currencyForSell: string;
  minAmount: string;
  maxAmount: string;
  activeAmount: number;
  innerCurrency: string;
  outerCurrency: string;
}

export interface IAds {
  ads: IAd[];
  currentPage: number;
  totalPages: number;
}

export interface IGetAdsParams {
  currency: {
    inner: string;
    outer: string;
  };
  page: number;
  min_amount: number;
  payment_method_id: number;
}