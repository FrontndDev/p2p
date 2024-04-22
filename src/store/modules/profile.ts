import * as API from '@/api';
import { TCtx } from "@/types/types";
import { IProfile } from "@/interfaces/store/modules/profile.interface.ts";

export default {
  namespaced: true,
  state: {
    profile: {} as IProfile
  },
  actions: {
    getProfile({ commit }: TCtx) {
      API.getProfile().then(response => commit('SET_PROFILE', response.data))
    }
  },
  mutations: {
    SET_PROFILE(state: any, profile: IProfile) {
      state.profile = profile
    }
  }
}