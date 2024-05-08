import { IStatistics } from "@/interfaces/store/modules/profile.interface.ts";

export interface AdsAuthor {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  statistics: IStatistics;
}

export interface ICurrency {
  inner: string;
  outer: string;
}

export interface IPrice {
  amount: string;
  currency: string;
}

export interface IAd {
  id: number;
  price: IPrice;
  paymentMethod: {
    currency: string;
    id: number;
    name: string;
  };
  paymentWindow: number;
  adsAuthor: AdsAuthor;
  availableValue: string;
  isActive: number;
  createdAt: string;
  authorComment: string;
  priceToShow: string;
  currencyForBuy: string;
  currencyForSell: string;
  minAmount: IPrice;
  maxAmount: IPrice;
  activeAmount: number;
  innerCurrency: string;
  outerCurrency: string;
  priceType: string;
  pricePercent: number | null;
  requisite?: {
    currency: string;
    id: number;
    paymentMethod: string;
    requisite: string;
  }
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
