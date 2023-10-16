import {getLibrary} from "@/utils/web3";
import {ethers} from "ethers";
import {parseInt} from 'lodash'
import {initOnboard, walletConnect, walletReset, getProvider} from '../../utils/onboard'

import { getInfo } from "./nftcontract";

const web3ModalStore = {
    state: {
        // web3Modal: null,
        library: getLibrary(),
        onboardactive:false,
        active: false,
        account: null,
        errorflag: false,
        errorstr:"",
        chainId: 0,
        // balance:0,
    },
    mutations: {
        // setWeb3Modal(state, web3Modal) {
        //     state.web3Modal = web3Modal
        // },
        setLibrary(state, library) {
            state.library = library
        },
        setActive(state, active) {
            state.active = active
        },
        setOnboardActive(state, active) {
            state.onboardactive = active
        },
        // setBalance(state, balance) {
        //     state.balance = balance;
        // },
        setAccount(state, account) {
            if(account != null) {
                state.account = account.toLowerCase()
            } else {
                state.account = account
            }
        },
        setChainId(state, chainId) {
            state.chainId = chainId
        },
        setErrorFlag(state, flag) {
            state.errorflag = flag
        },
        setErorStr(state, str) {
            state.errorstr = str
        },
    },
    actions: {
        // async connect({state, commit, dispatch}) {
        //     // await state.web3Modal.clearCachedProvider()
        //     // const provider = await state.web3Modal.connect()
        //     let provider
        //     try {
        //         provider = await state.web3Modal.connect()
        //     } catch (error) {
        //         commit("setErorStr", "User rejected");
        //         commit("setErrorFlag", true);
        //         return
        //     }

        //     const library = new ethers.providers.Web3Provider(provider)
        //     library.pollingInterval = 12000
            
        //     commit('setLibrary', library)

        //     const accounts = await library.listAccounts()

        //     let contractArray = process.env.VUE_APP_CONTRACT_ADDRESS.split(', ');
           
        //     let info
        //     let nftflag = true

        //     contractArray.forEach(async (nftcontract) => {
        //         info = await getInfo(accounts[0].toLowerCase(), nftcontract)
        //         if(info.balance <= 0 || !info) {
        //             nftflag = false
        //         }
        //     });
            
        //     if(nftflag) {
        //         commit("setErorStr", "NFT license not found in wallet");
        //         commit("setErrorFlag", true);
        //         return
        //     } else {
        //         commit("setErrorFlag", false);
        //     }
            
        //     if (accounts.length > 0) {
        //         commit('setAccount', accounts[0])
        //     }

        //     const network = await library.getNetwork()
        //     commit('setChainId', network.chainId)

        //     commit('setActive', true)

        //     provider.on("connect", async (info) => {
        //         let chainId = parseInt(info.chainId)
        //         commit('setChainId', chainId)
        //         console.log("connect", info)
        //     });

        //     provider.on("accountsChanged", async (accounts) => {
        //         // if (accounts.length > 0) {
        //         //     commit('setAccount', accounts[0])
        //         // } else {
        //         //     await dispatch('disconnect')
        //         // }
        //         await dispatch('disconnect')
        //         console.log("accountsChanged")
        //     });
        //     provider.on("chainChanged", async (chainId) => {
        //         // chainId = parseInt(chainId)
        //         // commit('setChainId', chainId)
        //         // console.log("chainChanged", chainId)
        //         await dispatch('disconnect')
        //     });
        // },
        // async disconnect({state, commit}) {
        //     const { web3 } = this.state;
        //     if (web3 && web3.currentProvider && web3.currentProvider.close) {
        //         await web3.currentProvider.close();
        //     }
        //     await state.web3Modal.clearCachedProvider();
        //     commit('setAccount', null)
        //     commit('setActive', false)
        //     // commit('setBalance', 0)
        //     commit('setLibrary', getLibrary())
        // },
        initwallet({state, commit}) {
            initOnboard()
        },
        async onboardConnect({state, commit}) {
            
            const flag = await walletConnect()

            if(!flag) {
                return
            }

            const provider = getProvider()

            const library = new ethers.providers.Web3Provider(provider)
            library.pollingInterval = 12000

            commit('setLibrary', library)

            if(!library) {
                return
            }

            let contractArray = process.env.VUE_APP_CONTRACT_ADDRESS.split(', ');

            const accounts = await state.library.listAccounts()
            if (accounts.length > 0) {
                commit('setAccount', accounts[0])
            } else {
                return
            }
            // console.log(process.env.VUE_APP_CONTRACT_ADDRESS)
            let info

            contractArray.forEach(async (nftcontract) => {
                info = await getInfo(accounts[0].toLowerCase(), nftcontract)
                // console.log("balance", info.balance, accounts[0], nftcontract)
                if(parseInt(info.balance) <= 0 || !info) {
                    commit("setErorStr", "NFT license not found in wallet")
                    commit("setErrorFlag", true)
                    commit('setOnboardActive', false)
                } else if(nftcontract === contractArray[contractArray.length - 1]) {
                    commit("setErrorFlag", false)
                    commit('setOnboardActive', true)
                }
            });

            const network = await library.getNetwork()
            commit('setChainId', network.chainId)

            provider.on("connect", async (info) => {
                let chainId = parseInt(info.chainId)
                commit('setChainId', chainId)
                console.log("connect", info)
            });

            provider.on("accountsChanged", async (accounts) => {
                // if (accounts.length > 0) {
                //     commit('setAccount', accounts[0])
                // } else {
                //     await dispatch('disconnect')
                // }
                // await dispatch('disconnect')
                console.log("accountsChanged")
            });
            provider.on("chainChanged", async (chainId) => {
                // chainId = parseInt(chainId)
                // commit('setChainId', chainId)
                console.log("chainChanged", chainId)
                // await dispatch('disconnect')
            });
        },
        async onboardDisconnect({state, commit}) {
            await walletReset()
            commit('setAccount', null)
            commit('setOnboardActive', false)
            // commit('setBalance', 0)
            commit('setLibrary', getLibrary())
        },
        // async setEnv({state, commit}) {
            
        //     const network = await state.library.getNetwork()
        //     commit('setChainId', network.chainId)

        //     commit('setOnboardActive', true)

        //     provider.on("connect", async (info) => {
        //         let chainId = parseInt(info.chainId)
        //         commit('setChainId', chainId)
        //         console.log("connect", info)
        //     });

        //     provider.on("accountsChanged", async (accounts) => {
        //         // if (accounts.length > 0) {
        //         //     commit('setAccount', accounts[0])
        //         // } else {
        //         //     await dispatch('disconnect')
        //         // }
        //         await dispatch('disconnect')
        //         console.log("accountsChanged")
        //     });
        //     provider.on("chainChanged", async (chainId) => {
        //         // chainId = parseInt(chainId)
        //         // commit('setChainId', chainId)
        //         // console.log("chainChanged", chainId)
        //         await dispatch('disconnect')
        //     });
        // }
    }
}

export default web3ModalStore;