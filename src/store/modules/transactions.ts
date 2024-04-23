import * as API from '@/api';
import { TCtx } from "@/types/types";
import {
  ICreateDealParams,
  ITransactionsHistory
} from "@/interfaces/store/modules/transactions.interface.ts";

export default {
  namespaced: true,
  state: {
    transactionsHistory: {} as ITransactionsHistory,
    transactionInfo: {},
  },
  actions: {
    getTransactionsHistory({ commit }: TCtx) {
      API.getTransactionsHistory().then(response => commit('SET_TRANSACTIONS_HISTORY', response.data))
    },
    getTransactionInfo({ commit }: TCtx, id: number) {
      API.getTransactionInfo(id).then(response => commit('SET_TRANSACTIONS_HISTORY', response.data))
    },
    createDeal(_: TCtx, data: ICreateDealParams) {
      API.createDeal(data).then(response => console.log('createDeal response', response))
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