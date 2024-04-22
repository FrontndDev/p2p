import * as API from '@/api';
import { TCtx } from "@/types/types";

export default {
  namespaced: true,
  state: {
    transactionsHistory: [],
    transactionInfo: {},
  },
  actions: {
    getTransactionsHistory({ commit }: TCtx) {
      API.getTransactionsHistory().then(response => commit('SET_TRANSACTIONS_HISTORY', response.data))
    },
    getTransactionInfo({ commit }: TCtx, id: number) {
      API.getTransactionInfo(id).then(response => commit('SET_TRANSACTIONS_HISTORY', response.data))
    },
    createDeal(_: TCtx, data: any) {
      API.createDeal(data).then(response => console.log('createDeal response', response))
    },
  },
  mutations: {
    SET_TRANSACTIONS_HISTORY(state: any, transactions: any) {
      state.transactionsHistory = transactions
    },
    SET_TRANSACTION_INFO(state: any, transaction: any) {
      state.transactionInfo = transaction
    }
  }
}