import * as API from '@/api';
import { TCtx } from "@/types/types";
import { ISelect } from "@/components/UI/Select/select.interface.ts";

export default {
  namespaced: true,
  state: {
    innerCurrencies: [] as string[],
    outerCurrencies: [] as string[],
    innerCurrency: {} as ISelect,
    outerCurrency: {} as ISelect,
    transactionFee: 0,
    currentRate: 0 as number,
  },
  actions: {
    async getCurrencies({ commit }: TCtx) {
      const key = '/api/v1/p2p'
      const data = API.getDataFromLS(key)

      const setData = (data: any) => {
        commit('SET_INNER_CURRENCIES', data.inner_currencies)
        commit('SET_OUTER_CURRENCIES', data.outer_currencies)
        commit('SET_TRANSACTION_FEE', data.transactionFee)
        // const setDefaultCurrency = () => {
        //   commit('SET_INNER_CURRENCY', {
        //     id: data.inner_currencies.indexOf(data.defaultInnerCurrency) + 1,
        //     name: data.defaultInnerCurrency
        //   })
        //   commit('SET_OUTER_CURRENCY', {
        //     id: data.outer_currencies.indexOf(data.defaultOuterCurrency) + 1,
        //     name: data.defaultOuterCurrency
        //   })
        // }
        //
        // setDefaultCurrency()
      }

      if (data) setData(data)

      return await API.getServiceInformation().then(response => {
        setData(response.data)

        API.setDataToLS(key, response.data)

        return response
      })
    },
    async getCurrencyRate({ commit }: TCtx, data: { from: number, to: number }) {
      await API.getCurrencyRate(data).then(response => {
        if (response?.data?.rate) commit('SET_CURRENT_RATE', response?.data?.rate)
        return response
      })
    }
  },
  mutations: {
    SET_INNER_CURRENCIES(state: any, currencies: string[]) {
      state.innerCurrencies = currencies
    },
    SET_OUTER_CURRENCIES(state: any, currencies: string[]) {
      state.outerCurrencies = currencies
    },
    SET_INNER_CURRENCY(state: any, currency: ISelect) {
      state.innerCurrency = currency
    },
    SET_OUTER_CURRENCY(state: any, currency: ISelect) {
      state.outerCurrency = currency
    },
    SET_CURRENT_RATE(state: any, rate: any) {
      state.currentRate = rate
    },
    SET_TRANSACTION_FEE(state: any, transactionFee: number) {
      state.transactionFee = transactionFee
    }
  },
}