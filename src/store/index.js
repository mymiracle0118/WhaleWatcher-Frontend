import Vue from 'vue'
import Vuex from 'vuex'
import web3ModalStore from "@/store/modules/web3Modal";
import contractInfoStore from "@/store/modules/nftcontract";
import userStore from "@/store/modules/user";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        web3Modal: web3ModalStore,
        nftcontract: contractInfoStore,
        user: userStore
    }
})
