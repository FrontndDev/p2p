import {
    createStore
} from "vuex";
import paymentMethods from "@/store/modules/payment-methods";
import currencies from "@/store/modules/currencies";
import ads from "@/store/modules/ads";
import transactions from "@/store/modules/transactions.ts";
import requisites from "@/store/modules/requisites.ts";
import profile from "@/store/modules/profile.ts";

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
    },
    actions: {

    },
    getters: {
    }
});