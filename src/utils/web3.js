import {ethers} from 'ethers'
import web3 from 'web3'
import {RINKEBYCHAIN} from "../config/setting"


export const getLibrary = () => {
    const httpProvider = new web3.providers.HttpProvider(getChain().rpc)
    const web3NoAccount = new ethers.providers.Web3Provider(httpProvider)
    web3NoAccount.pollingInterval = getChain().pollinginterval;
    return web3NoAccount
}

export const getChain = () => {
    // console.log(process.env.VUE_APP_CHAIN)
    if(process.env.VUE_APP_CHAIN === "RINKEBY") {
        return RINKEBYCHAIN;
    } else if(process.env.VUE_APP_CHAIN === "HOMESTEAD") {
        return HOMESTEAD;
    }
}

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(getChain().rpc)