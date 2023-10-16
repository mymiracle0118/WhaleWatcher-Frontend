import {getNftContract} from "@/utils/contract";
import web3Modal from "@/store/modules/web3Modal";
import { SSL_OP_EPHEMERAL_RSA } from "constants";

const contractInfoStore = {
    state: {
        balance: 0,
    },
    getters: {},
    mutations: {
        setBalance(state, balance) {
            state.balance = balance
        },
    },
    actions: {
        async getUserBalance({commit}) {
            const info = await getInfo(web3Modal.state.account)
            commit('setBalance', info.balance.toNumber())
        },
    },
}
export default contractInfoStore

export const getInfo = async (account, address) => {
    const contract = await getNftContract(address)

    let balance;

    balance = await contract.balanceOf(account)
    
    return {
        balance
    }
}
