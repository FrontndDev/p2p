import { IPrice } from "@/interfaces/store/modules/ads.interface.ts";

export interface IWallet {
  currency: string;
  amount: number;
  realAmount: number;
  id: number;
}

export interface IWallets {
  [currency: string]: IWallet
}

export interface ISystemWallets {
  [currency: string]: IPrice
}

export interface IRequisite {
  id: number;
  currency: string;
  requisite: string;
  paymentMethod: string;
}

export interface IUserCanCreateAds {
  can: boolean;
  message: string;
}

export interface IStatistics {
  successPercent: number;
  transactionsCount: number;
  goodTransactionCount: number;
  badTransactionCount: number;
}

export interface IProfile {
  allowedPaymentWindow: number[];
  requisites: IRequisite[];
  statistics: IStatistics;
  telegramActive: boolean;
  userCanCreateAds: IUserCanCreateAds;
  systemWallets: ISystemWallets;
  wallets: IWallets;
}

export interface IInteractionWithWallet {
  amount: number;
  action: string;
  currency: string;
}

export interface AdsAuthor {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface IProfileAd {
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
  priceType: string;
  pricePercent: number;
  createdAt: string;
  isActive: number;
}

export interface IProfileAds {
  ads: IProfileAd[];
  currentPage: number;
  totalPages: number;
}