import * as API from '@/api';
import { TCtx } from "@/types/types";
import { ICreateRequisiteParams } from "@/interfaces/store/modules/requisites.interface.ts";

export default {
  namespaced: true,
  state: {

  },
  actions: {
    createRequisite(_: TCtx, data: ICreateRequisiteParams) {
      API.createRequisite(data).then(response => console.log('createRequisite response', response))
    },
    updateRequisite(_: TCtx, { id, data }: any) {
      API.updateRequisite(id, data).then(response => console.log('updateRequisite response', response))
    },
    deleteRequisite(_: TCtx, id: number) {
      API.deleteRequisite(id).then(response => console.log('deleteRequisite response', response))
    }
  },
  mutations: {

  }
}