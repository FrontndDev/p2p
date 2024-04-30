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
  price_type: string;
  price_percent: number | null;
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
  min_amount: number | string;
  payment_method_id: number;
}

export interface IAdParams {
  inner_currency: string;
  outer_currency: string;
  requisite_id: number;
  min_amount: number;
  max_amount: number;
  comment: string;
  factor?: number;
  price?: number;
  price_type: string;
}

export interface IUpdateAd {
  id: number;
  data: IAdParams;
}