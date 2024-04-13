import {
    createStore
} from "vuex";
import paymentMethods from "@/store/modules/payment-methods";
import currencies from "@/store/modules/currencies";
import ads from "@/store/modules/ads";

export default createStore({
    modules: {
        currencies,
        paymentMethods,
        ads,
    },
    state: {
    },
    actions: {

    },
    getters: {
    }
});