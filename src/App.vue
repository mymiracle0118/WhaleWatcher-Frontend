<template>
  <v-app id="app">
    <Header/>
    <div>
      <router-view/>
    </div>
    <!-- <web3-modal-vue
        ref="web3modal"
        :theme="theme"
        :provider-options="providerOptions"
        :disableInjectedProvider="true"
    />

    <div>
      <button class="button" @click="connect">{{flag}}</button>
      <span></span>
    </div>
    <br />
    <div v-show="active">
      <span>{{account}}</span>
      <button class="button" @click="disconnect">logout</button>
    </div>
    <br />
    <div v-show="active">
      <h2>Address:{{account}}</h2>
      <h2>NFT Balance:{{balance}}</h2>
    </div>
    <div v-show="errorflag">
      <h2 class="errorlabel">{{errorstr}}</h2>
    </div> -->
    <div>
      <button class="button" @click="onboardconnect">Login</button>
    </div>
    <br />

    <div v-show="onboardactive">
      <span>{{account}}</span>
      <button class="button" @click="onboarddisconnect">logout</button>
    </div>
    <div v-show="onboardactive">
      <h2>Address:{{account}}</h2>
      <h2>NFT liscense found</h2>
      <!-- <h2>NFT Balance:{{balance}}</h2> -->
    </div>
    <div v-show="errorflag">
      <h2 class="errorlabel">{{errorstr}}</h2>
    </div>
    <!-- <div>
      <button class="button" @click="getinfo">{{"getinfo"}}</button>
      <h2>Address:{{account}}, NFT Balance:{{balance}} </h2>
    </div>
    <br /> -->
    <!-- <div>
      <button class="button" @click="getbalance">{{"getbalance"}}</button>
      <span>{{balance}}</span>
    </div> -->
    <!-- <img src='../src/assets/images/coinbase-wallet.svg' /> -->
  </v-app>
</template>
<script>
import Web3ModalVue from "web3modal-vue";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { WalletLink } from 'walletlink';
import {web3Modal, nftContract} from "./config/mixins";
import Header from "@/components/Header";
import {getChain, METAMASKURL} from "./utils/web3"
import coinwalletsvg from "./assets/images/coinbase-wallet.svg";
import walletconnectsvg from "./assets/images/walletconnect.svg";
import metamasksvg from "./assets/images/metamask.svg";
// import detectEthereumProvider from '@metamask/detect-provider'
// import Torus from "@toruslabs/torus-embed";
// import Authereum from "authereum";
// import Portis from "@portis/web3";
// import {FORTMATIC_KEY, CHAINID, NETWORKID} from "../src/config/setting";

export default {
  components: {
    Header,
    Web3ModalVue,
  },
  mixins: [web3Modal, nftContract],
  data() {
    return {
      // theme: 'dark',
      // providerOptions: {
      //   "custom-metamask": {
      //       display: {
      //         logo: metamasksvg,
      //         name: "MetaMask Wallet",
      //         description: "Connect to your MetaMask Wallet"
      //       },
      //       package: true,
      //       connector: async () => {

      //           if (!window.ethereum) {
      //               window.location = METAMASKURL;
      //               throw new Error("Metamask is Unistalled");
      //           }

      //           let provider = null;
      //           // console.log(window)
      //           if (typeof window.ethereum !== 'undefined') {
      //               let providers = window.ethereum.providers;
      //               // console.log(providers)
      //               if(!providers) {
      //                 provider = window.ethereum
      //               } else {
      //                 provider = providers.find(p => p.isMetaMask); // <-- LOOK HERE
      //               }
                    
      //               try {
      //                   await provider.request({ method: 'eth_requestAccounts' });
      //               } catch (error) {
      //                   throw new Error("User Rejected");
      //               }
      //           } else {
      //               throw new Error("No MetaMask Wallet found");
      //           }
      //           // console.log("MetaMask provider", provider);
      //           return provider;
      //       }
      //   },
      //   'custom-walletconnect': {
      //     display: {
      //       logo: walletconnectsvg,
      //       name: 'WalletConnect',
      //       description: 'Scan with WalletConnect to connect',
      //     },
      //     package: WalletConnectProvider,
      //     connector: async (_, options) => {
      //       const provider = new WalletConnectProvider({
      //         rpc: { 1: getChain().rpc},
      //       });
      //       provider.enable();
      //       return provider;
      //     },
      //   },
      //   'custom-walletlink': {
      //     display: {
      //       logo: coinwalletsvg,
      //       name: 'WalletLink',
      //       description: 'Scan with WalletLink to connect',
      //     },
      //     options: {
      //       appName: 'app', // Your app name
      //       networkUrl: getChain().rpc,
      //       chainId:getChain().chainid,
      //     },
      //     package: WalletLink,  
      //     connector: async (_, options) => {
      //       const { appName, networkUrl, chainId } = options
      //       const walletLink = new WalletLink({
      //         appName
      //       });
      //       const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
      //       await provider.enable();
      //       return provider;
      //     },
      //   },       
      // },
      active: false,
      onboardactive: false,
      balance: 0,
      flag:"login",
      account:this.$store.state.web3Modal.account,
      errorflag:false,
      errorstr:"",
    }
  },
  created() {
    // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //   this.theme = 'dark'
    // }
    this.$store.dispatch('initwallet')
  },
  mounted() {
    console.log("changed")
    // console.log(process.env)
    // this.$nextTick(async () => {
    //   const web3modal = this.$refs.web3modal;
    //   this.$store.commit('setWeb3Modal', web3modal)
    //   if (web3modal.cachedProvider) {
    //     this.connect()
    //   }
    // })
  },
  computed: {
    accountstr() {
      const str = this.$store.state.account;
      return str;
    },
  },
  methods: {
    connect() {
      this.$store.dispatch('connect')
    },
    onboardconnect() {
      this.$store.dispatch('onboardConnect')
    },
    disconnect() {
      this.$store.dispatch('disconnect')
    },
    onboarddisconnect() {
      this.$store.dispatch('onboardDisconnect')
    },
    getinfo() {
      // console.log('getinfo')
      this.account = this.$store.state.web3Modal.account
      this.balance = this.$store.state.web3Modal.balance
      this.active = this.$store.state.web3Modal.active
      this.onboardactive = this.$store.state.web3Modal.onboardactive
      if(this.$store.state.web3Modal.active) {
        let substring = this.$store.state.web3Modal.account;
        this.flag = substring.substr(0, 6) + "..." + substring.substr(substring.length-4,4) 
      } else {
        this.flag = "login"
      }

      // console.log(this.$store.state.web3Modal.account)
    },
    getbalance() {
      // console.log(this.$store)
      this.$store.dispatch('getUserBalance')
    }
  },
  watch: {
      '$store.state.web3Modal.active': function() {
        // this.account = this.$store.state.web3Modal.account;
        // console.log("tseet = ",this.$store.state.web3Modal.account)
        this.getinfo()
      },
      '$store.state.web3Modal.onboardactive': function() {
        // this.account = this.$store.state.web3Modal.account;
        // console.log("tseet = ",this.$store.state.web3Modal.account)
        this.getinfo()
      },
      '$store.state.web3Modal.errorflag': function() {
        // this.balance = this.$store.state.web3Modal.balance;
        this.errorflag = this.$store.state.web3Modal.errorflag
      },
      '$store.state.web3Modal.errorstr': function() {
        // this.balance = this.$store.state.web3Modal.balance;
        this.errorstr = this.$store.state.web3Modal.errorstr
      }
  }
}
</script>
<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}
.button {
  // background-image: linear-gradient(to rirgb(240, 1ght, rgba(255,0,0,0), 25, 125));
  background-color: #3b5ae6;
  border: round($number: 0);
  border-radius: 10px;
  color: white;
  padding: 1px 10px;
  text-align: center;
  font-size: 16px;
  align-content: center;
  margin: auto;
  opacity: 0.8;
  transition: 0.3s;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  width:120px;
  height: 50px;
}

div {
  text-align: center;
}

.errorlabel {
  color: #ff0000;
}

.button:hover {opacity: 1}
</style>
