export interface IWallet {
  currency: string;
  amount: number;
  realAmount: number;
  id: number;
}

export interface IWallets {
  [currency: string]: IWallet
}

export interface IRequisites {
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
  requisites: IRequisites[];
  wallets: IWallets;
  telegramActive: boolean;
  userCanCreateAds: IUserCanCreateAds;
  statistics: IStatistics;
}