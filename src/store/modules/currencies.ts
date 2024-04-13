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
  },
  actions: {
    async getCurrencies({ commit }: TCtx) {
      return await API.getServiceInformation().then(response => {
        commit('SET_INNER_CURRENCIES', response.data.inner_currencies)
        commit('SET_OUTER_CURRENCIES', response.data.outer_currencies)

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
    SET_INNER_CURRENCY(state: any, currency: ICurrency) {
      state.innerCurrency = currency
    },
    SET_OUTER_CURRENCY(state: any, currency: ICurrency) {
      state.outerCurrency = currency
    }
  },
}