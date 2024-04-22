import * as API from '@/api';
import { TCtx } from "@/types/types";
import {
  IAdParams,
  IGetAdsParams,
  IUpdateAd
} from "@/interfaces/store/modules/ads.interface.ts";
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
    },
    createAd(_: TCtx, data: IAdParams) {
      API.createAd(data).then(response => console.log('createAd response', response))
    },
    updateAd(_: TCtx, { id, data }: IUpdateAd) {
      API.updateAd(id, data).then(response => console.log('updateAd response', response))
    },
    deleteAd(_: TCtx, id: number) {
      API.deleteAd(id).then(response => console.log('deleteAd response', response))
    }
  },
  mutations: {
    SET_ADS(state: any, ads: IAds) {
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