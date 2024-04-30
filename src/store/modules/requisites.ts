import * as API from '@/api';
import { TCtx } from "@/types/types";
import {
  ICreateRequisiteParams,
  IUpdateRequisiteParams
} from "@/interfaces/store/modules/requisites.interface.ts";

export default {
  namespaced: true,
  actions: {
    async createRequisite({ commit }: TCtx, data: ICreateRequisiteParams) {
      return await API.createRequisite(data).then(response => {
        commit('profile/ADD_REQUISITE', response.data.requisite, { root: true })
        return response
      })
    },
    updateRequisite({ commit }: TCtx, { id, data }: IUpdateRequisiteParams) {
      API.updateRequisite(id, data).then(response => commit('profile/UPDATE_REQUISITE', response.data.requisite, { root: true }))
    },
    deleteRequisite({ commit }: TCtx, id: number) {
      API.deleteRequisite(id).then(() => commit('profile/DELETE_REQUISITE', id, { root: true }))
    }
  },
}