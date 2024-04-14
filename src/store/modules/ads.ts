import * as API from '@/api';
import { TCtx } from "@/types/types";
import { IGetAdsParams } from "@/interfaces/store/modules/ads.interface.ts";
import {
  IAds,
} from "@/interfaces/store/modules/ads.interface.ts";

export default {
  namespaced: true,
  state: {
    ads: {} as IAds,
    page: 1 as number,
    minAmount: '10' as string,
  },
  actions: {
    getAds({ commit, state, rootState }: TCtx) {
      const data: IGetAdsParams = {
        currency: {
          inner: rootState.currencies.innerCurrency.name,
          outer: rootState.currencies.outerCurrency.name,
        },
        page: state.page,
        min_amount: state.minAmount ? state.minAmount : 0,
        payment_method_id: rootState.paymentMethods.selectedPaymentMethod.id
      }
      API.getAds(data).then(response => commit('SET_ADS', response.data))
    }
  },
  mutations: {
    SET_ADS(state: any, ads: any[]) {
      state.ads = ads
    },
    SET_MIN_AMOUNT(state: any, minAmount: string) {
      state.minAmount = minAmount
    },
    SET_PAGE(state: any, page: number) {
      state.page = page
    }
  }
}