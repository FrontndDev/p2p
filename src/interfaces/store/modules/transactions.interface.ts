export interface IStatus {
  name: string;
  isBad: boolean;
  expiredIn: number;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  canChangeStatus: boolean;
}

export interface ITransaction {
  id: number;
  ads_id: number;
  amount: number;
  statusTransaction: string;
  status: IStatus;
  comment: string;
  price: number;
  innerCurrency: string;
  outerCurrency: string;
  createdAt: string;
  seller: IUser;
  buyer: IUser;
}

export interface ITransactionsHistory {
  totalPages: number;
  currentPage: number;
  transactions: ITransaction[];
}

export interface ICreateDealParams {
  adsId: number;
  amount: number;
  comment: string;
}