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
  },
  actions: {
    getTransactionsHistory({ commit }: TCtx) {
      API.getTransactionsHistory().then(response => commit('SET_TRANSACTIONS_HISTORY', response.data))
    },
    async getTransactionInfo({ commit }: TCtx, id: number) {
      return await API.getTransactionInfo(id).then(response => commit('SET_TRANSACTION_INFO', response.data.transaction))
    },
    async createDeal(_: TCtx, data: ICreateDealParams) {
      return await API.createDeal(data)
    },
  },
  mutations: {
    SET_TRANSACTIONS_HISTORY(state: any, transactions: ITransactionsHistory) {
      state.transactionsHistory = transactions
    },
    SET_TRANSACTION_INFO(state: any, transaction: any) {
      state.transactionInfo = transaction
    }
  }
}