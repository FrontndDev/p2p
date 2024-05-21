import {
    createStore
} from "vuex";
import paymentMethods from "@/store/modules/payment-methods";
import currencies from "@/store/modules/currencies";
import ads from "@/store/modules/ads";
import transactions from "@/store/modules/transactions.ts";
import requisites from "@/store/modules/requisites.ts";
import profile from "@/store/modules/profile.ts";
import { ITabs } from "@/components/UI/Tabs/tabs.interface.ts";

export default createStore({
    modules: {
        currencies,
        paymentMethods,
        ads,
        transactions,
        requisites,
        profile,
    },
    state: {
        purchaseActiveTab: {} as ITabs,
        saleActiveTab: {} as ITabs,
    },
    actions: {

    },
    mutations: {
        SET_PURCHASE_ACTIVE_TAB(state: any, tab: ITabs) {
          state.purchaseActiveTab = tab
        },
        SET_SALE_ACTIVE_TAB(state: any, tab: ITabs) {
          state.saleActiveTab = tab
        },
    }
});