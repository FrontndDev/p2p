import * as API from '@/api';
import { TCtx } from "@/types/types";
import {
  IInteractionWithWallet,
  IProfile,
  IRequisite,
  IWallet
} from "@/interfaces/store/modules/profile.interface.ts";
import { IAds } from "@/interfaces/store/modules/ads.interface.ts";

export default {
  namespaced: true,
  state: {
    profile: {} as IProfile,
    ads: {} as IAds,
    page: 1,
  },
  actions: {
    getProfile({ commit }: TCtx) {
      API.getProfile().then(response => commit('SET_PROFILE', response.data))
    },
    getAds({ commit, state }: TCtx) {
      API.getProfileAds(state.page).then(response => commit('SET_ADS', response.data))
    },
    topUpWallet({ commit }: TCtx, data: IInteractionWithWallet) {
      API.topUpWallet(data).then(response => commit('UPDATE_WALLET', response.wallet))
    },
    withdrawWallet({ commit }: TCtx, data: IInteractionWithWallet) {
      API.withdrawWallet(data).then(response => commit('UPDATE_WALLET', response.wallet))
    },
  },
  mutations: {
    SET_PROFILE(state: any, profile: IProfile) {
      state.profile = profile
    },
    SET_ADS(state: any, ads: any) {
      state.ads = ads
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
      state.profile.wallets[wallet.currency] = wallet
    },
    SET_PAGE(state: any, page: number) {
      state.page = page
    }
  }
}