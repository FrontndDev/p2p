import * as API from '@/api';
import { TCtx } from "@/types/types";
import { IPaymentMethod } from "@/interfaces/store/modules/payment-methods.interface.ts";
import { ISelect } from "@/components/UI/Select/select.interface.ts";

export default {
  namespaced: true,
  state: {
    paymentMethods: [] as IPaymentMethod[],
    paymentMethod: {} as IPaymentMethod,
    selectedPaymentMethod: {} as ISelect,
  },
  actions: {
    async getPaymentMethodsByCurrency({ commit }: TCtx, currency: string) {
      return await API.getPaymentMethodsByCurrency(currency).then(response => {
        commit('SET_PAYMENT_METHODS', response.data.payment_methods)

        return response
      })
    },
  },
  mutations: {
    SET_PAYMENT_METHODS(state: any, paymentMethods: any[]) {
      state.paymentMethods = paymentMethods
    },
    SET_PAYMENT_METHOD(state: any, paymentMethod: any) {
      state.paymentMethod = paymentMethod
    },
    SET_SELECTED_PAYMENT_METHOD(state: any, method: ISelect) {
      state.selectedPaymentMethod = method
    }
  },
  getters: {
    paymentMethodsForSelect(state: any) {
      return state.paymentMethods.map((method: IPaymentMethod) => ({ id: method.id, name: method.name }))
    }
  }
}