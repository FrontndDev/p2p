import * as API from '@/api';
import { TCtx } from "@/types/types";
import {
  ICreateDealParams,
  ITransaction,
  ITransactionsHistory
} from "@/interfaces/store/modules/transactions.interface.ts";

export default {
  namespaced: true,
  state: {
    transactionsHistory: {} as ITransactionsHistory,
    transactionInfo: {} as ITransaction,
    profileTransactionHistory: {} as ITransactionsHistory,
    interval: 0,
  },
  actions: {
    getTransactionsHistory({ commit }: TCtx, page = 1) {
      API.getTransactionsHistory(page).then(response => commit('SET_TRANSACTIONS_HISTORY', response.data))
    },
    async getTransactionInfo({ commit }: TCtx, id: number) {
      return await API.getTransactionInfo(id).then(response => commit('SET_TRANSACTION_INFO', response.data.transaction))
    },
    getProfileTransactionInfo({ commit }: TCtx, page = 1) {
      API.getProfileTransactionHistory(page).then(response => commit('SET_PROFILE_TRANSACTION_INFO', response.data))
    },
    async createDeal(_: TCtx, { data, adId }: { data: ICreateDealParams, adId: number }) {
      return await API.createDeal(data, adId)
    },
    async payedDeal(_: TCtx, id: number) {
      return await API.payedDeal(id)
    }
  },
  mutations: {
    SET_TRANSACTIONS_HISTORY(state: any, transactions: ITransactionsHistory) {
      state.transactionsHistory = transactions
    },
    SET_TRANSACTION_INFO(state: any, transaction: ITransaction) {
      state.transactionInfo = transaction
    },
    SET_PROFILE_TRANSACTION_INFO(state: any, transactions: ITransactionsHistory) {
      state.profileTransactionHistory = transactions
    },
    SET_INTERVAL(state: any, interval: number) {
      state.interval = interval
    },
    CLEAR_INTERVAL(state: any) {
      if (state.interval) clearInterval(state.interval)
    }
  }
}