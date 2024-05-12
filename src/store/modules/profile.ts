import * as API from '@/api';
import { TCtx } from "@/types/types";
import {
  IInteractionWithWallet,
  IProfile,
  IRequisite,
  IWallet
} from "@/interfaces/store/modules/profile.interface.ts";
import {
  IAd,
  IAdParams,
  IAds,
  IUpdateAd
} from "@/interfaces/store/modules/ads.interface.ts";

export default {
  namespaced: true,
  state: {
    profile: {} as IProfile,
    ads: {} as IAds,
    detailAd: {} as IAd,
    page: 1,
  },
  actions: {
    getProfile({ commit }: TCtx) {
      API.getProfile().then(response => commit('SET_PROFILE', response.data))
    },
    getAds({ commit, state }: TCtx) {
      API.getProfileAds(state.page).then(response => commit('SET_ADS', response.data))
    },
    async createAd(_: TCtx, data: IAdParams) {
      return await API.createAd(data).then(response => response)
    },
    updateAd({ commit }: TCtx, { id, data }: IUpdateAd) {
      API.updateAd(id, data).then(response => commit('UPDATE_AD', response.data))
    },
    async getDetailAd({ commit }: TCtx, id: number) {
      return await API.getAd(id).then(response => commit('SET_DETAIL_AD', response.data.ad))
    },
    updateAdStatus({ commit }: TCtx, id: number) {
      API.updateAdStatus(id).then(response => commit('UPDATE_DETAIL_AD', response.data.ad))
    },
    async deleteAd(_: TCtx, id: number) {
      return await API.deleteAd(id).then(response => response)
    },
    topUpWallet({ commit, dispatch }: TCtx, data: IInteractionWithWallet) {
      API.topUpWallet(data).then(response => {
        commit('UPDATE_WALLET', response.wallet)
        dispatch('getProfile', {})
      })
    },
    withdrawWallet({ commit }: TCtx, data: IInteractionWithWallet) {
      API.withdrawWallet(data).then(response => commit('UPDATE_WALLET', response.wallet))
    },
    async acceptDeal(_: TCtx, id: number) {
      return await API.acceptDeal(id).then(response => console.log('acceptDeal', response))
    },
    async cancelDeal(_: TCtx, id: number) {
      return await API.cancelDeal(id).then(response => console.log('cancelDeal', response))
    },
  },
  mutations: {
    SET_PROFILE(state: any, profile: IProfile) {
      state.profile = profile
    },
    SET_ADS(state: any, ads: any) {
      state.ads = ads
    },
    SET_DETAIL_AD(state: any, ad: IAd) {
      state.detailAd = ad
    },
    UPDATE_AD(state: any, ad: IAd) {
      const index = state.ads?.ads?.findIndex((adSecond: IAd) => ad.id === adSecond.id)
      if (index !== -1 && state.ads?.ads) state.ads.ads[index] = ad
    },
    UPDATE_DETAIL_AD(state: any, ad: IAd) {
      const index = state.ads?.ads?.findIndex((adSecond: IAd) => ad.id === adSecond.id)
      if (index !== -1 && state.ads?.ads) state.ads.ads[index] = ad
    },
    ADD_REQUISITE(state: any, requisite: IRequisite) {
      state.profile.requisites.push(requisite)
    },
    UPDATE_REQUISITE(state: any, requisite: IRequisite) {
      const index = state.profile.requisites.map((requisite: IRequisite) => requisite.id).indexOf(requisite.id)
      state.profile.requisites[index] = requisite
    },
    DELETE_REQUISITE(state: any, id: number) {
      const index = state.profile.requisites.map((requisite: IRequisite) => requisite.id).indexOf(id)
      state.profile.requisites.splice(index, 1)
    },
    UPDATE_WALLET(state: any, wallet: IWallet) {
      if (wallet?.currency) {
        state.profile.wallets[wallet.currency] = wallet
      }
    },
    SET_PAGE(state: any, page: number) {
      state.page = page
    },
  }
}