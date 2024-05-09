import {
  IRequisite,
  IStatistics
} from "@/interfaces/store/modules/profile.interface.ts";
import { IPrice } from "@/interfaces/store/modules/ads.interface.ts";

export interface IStatus {
  name: string;
  isBad: boolean;
  expiredIn: number;
}

export interface IBuyer {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  canChangeStatus: boolean;
}

export interface ISeller {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  canChangeStatus: boolean;
  statistics: IStatistics;
}

export interface ITransaction {
  id: number;
  ads_id: number;
  amount: number;
  statusTransaction: string;
  status: IStatus;
  comment: string;
  price: IPrice;
  innerCurrency: string;
  outerCurrency: string;
  createdAt: string;
  seller: ISeller;
  buyer: IBuyer;
  requisite: IRequisite;
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
  payment_window: number;
}