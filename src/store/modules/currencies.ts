import * as API from '@/api';
import { TCtx } from "@/types/types";
import { ICurrency } from "@/interfaces/store/modules/ads.interface.ts";
import { ISelect } from "@/components/UI/Select/select.interface.ts";

export default {
  namespaced: true,
  state: {
    innerCurrencies: [] as string[],
    outerCurrencies: [] as string[],
    innerCurrency: {} as ISelect,
    outerCurrency: {} as ISelect,
    telegramBotUrl: '',
    transactionFee: 0,
    currentRate: 0 as number,
  },
  actions: {
    async getCurrencies({ commit }: TCtx) {
      const key = '/api/v1/p2p'
      const data = API.getDataFromLS(key)
      if (data) {
        commit('SET_INNER_CURRENCIES', data.inner_currencies)
        commit('SET_OUTER_CURRENCIES', data.outer_currencies)
        commit('SET_TELEGRAM_BOT_URL', data.telegramBotUrl)
        commit('SET_TRANSACTION_FEE', data.transactionFee)
      }

      return await API.getServiceInformation().then(response => {
        commit('SET_INNER_CURRENCIES', response.data.inner_currencies)
        commit('SET_OUTER_CURRENCIES', response.data.outer_currencies)
        commit('SET_TELEGRAM_BOT_URL', response.data.telegramBotUrl)
        commit('SET_TRANSACTION_FEE', response.data.transactionFee)

        API.setDataToLS(key, response.data)

        return response
      })
    },
    getCurrencyRate({ commit }: TCtx, data: { from: number, to: number }) {
      API.getCurrencyRate(data).then(response => commit('SET_CURRENT_RATE', response.data.rate))
    }
  },
  mutations: {
    SET_INNER_CURRENCIES(state: any, currencies: string[]) {
      state.innerCurrencies = currencies
    },
    SET_OUTER_CURRENCIES(state: any, currencies: string[]) {
      state.outerCurrencies = currencies
    },
    SET_INNER_CURRENCY(state: any, currency: ICurrency) {
      state.innerCurrency = currency
    },
    SET_OUTER_CURRENCY(state: any, currency: ICurrency) {
      state.outerCurrency = currency
    },
    SET_CURRENT_RATE(state: any, rate: any) {
      state.currentRate = rate
    },
    SET_TELEGRAM_BOT_URL(state: any, url: string) {
      state.telegramBotUrl = url
    },
    SET_TRANSACTION_FEE(state: any, transactionFee: number) {
      state.transactionFee = transactionFee
    }
  },
}