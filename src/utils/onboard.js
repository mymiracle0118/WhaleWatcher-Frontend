// import stagingOnboard from 'bnc-onboard-staging'
// import stagingNotify from 'bnc-notify-staging'
// import Notify from 'bnc-notify'
import Onboard from 'bnc-onboard'

import {getChain} from "./web3"

const networkId = getChain().networkid
const rpcUrl = getChain().rpc
const apiUrl = process.env.VUE_APP_API_URL
const email = process.env.VUE_APP_EMAIL
const staging = process.env.REACT_APP_STAGING
const dappId = process.env.VUE_APP_DAPP_ID
const portiskey = process.env.VUE_APP_PORTIS_KEY
const fortmatickey = process.env.VUE_APP_FORTMATIC_KEY
const infurakey = process.env.VUE_APP_INFURAKEY
const tresure_url = process.env.VUE_APP_TRESURE_API_URL
const appname = "Web3 Integration"

let onboard = null
let wallet_provider = null
let wallet_name = ""

export const getProvider = () => {
  let provider;
  if(wallet_name === "MetaMask") {
    if(wallet_provider.providers) {
      provider = wallet_provider.providers.find(p => p.isMetaMask); // <-- LOOK HERE
    } else {
      provider = wallet_provider
    }
    
  } else {
    provider = wallet_provider
  }
  return provider
}

export const getWalletName = () => {
  return wallet_name;
}

// const subscriptions = {
//   address: setAddress,
//   ens: setEns,
//   network: setNetwork,
//   balance: setBalance,
//   wallet: wallet => {
//     if (wallet.provider) {
//       setWallet(wallet)

//       const ethersProvider = new ethers.providers.Web3Provider(
//         wallet.provider
//       )

//       provider = ethersProvider

//       internalTransferContract = new ethers.Contract(
//         '0xb8c12850827ded46b9ded8c1b6373da0c4d60370',
//         internalTransferABI,
//         getSigner(ethersProvider)
//       )

//       window.localStorage.setItem('selectedWallet', wallet.name)
//     } else {
//       provider = null
//       setWallet({})
//     }
//   }
// }

export function initOnboard() {
  // const onboard = staging ? stagingOnboard : Onboard
  onboard = Onboard({
    dappId,
    // hideBranding: false,
    networkId,
    // apiUrl,
    hideBranding: true,
    darkMode: true,
    // subscriptions,
    subscriptions: {
        wallet: (wallet) => {
          wallet_provider = wallet.provider;
          // console.log("wallet", wallet)
          wallet_name = wallet.name
          console.log(`${wallet.name} is now connected`);
        }
    },
    walletSelect: {
      wallets: [
        { walletName: 'metamask', preferred: true },
        {
          walletName: 'trezor',
          appUrl: tresure_url,
          email: email,
          rpcUrl
        },
        {
          walletName: 'ledger',
          rpcUrl
        },
        {
          walletName: 'walletConnect',
          infuraKey: infurakey,
          preferred: true
        },
        { walletName: 'cobovault', appName: appname, rpcUrl },
        { walletName: 'keystone', appName: appname, rpcUrl },
        { walletName: 'keepkey', rpcUrl },
        {
          walletName: 'lattice',
          appName: appname,
          rpcUrl
        },
        { walletName: 'coinbase', preferred: true },
        { walletName: 'status' },
        { walletName: 'walletLink', rpcUrl, preferred: true },
        {
          walletName: 'portis',
          apiKey: portiskey,
        },
        { walletName: 'fortmatic', apiKey: fortmatickey },
        { walletName: 'torus' },
        { walletName: 'trust', rpcUrl, preferred: true },
        { walletName: 'opera' },
        { walletName: 'operaTouch' },
        { walletName: 'imToken', rpcUrl },
        { walletName: 'meetone' },
        { walletName: 'mykey', rpcUrl },
        { walletName: 'wallet.io', rpcUrl },
        { walletName: 'huobiwallet', rpcUrl },
        { walletName: 'alphawallet', rpcUrl },
        { walletName: 'hyperpay' },
        { walletName: 'atoken' },
        { walletName: 'liquality' },
        { walletName: 'frame' },
        { walletName: 'tokenpocket', rpcUrl },
        { walletName: 'authereum', disableNotifications: true },
        { walletName: 'ownbit' },
        { walletName: 'gnosis' },
        { walletName: 'dcent' },
        { walletName: 'bitpie' },
        { walletName: 'xdefi' },
        { walletName: 'binance' },
        { walletName: 'tp' },
      ]
    },
    // walletCheck: [
    //   { checkName: 'derivationPath' },
    //   { checkName: 'connect' },
    //   { checkName: 'accounts' },
    //   { checkName: 'network' },
    //   { checkName: 'balance', minimumBalance: '100000' }
    // ]
  })
}

export const walletConnect = async () => {
  const walletSelected = await onboard.walletSelect()
            
  if (!walletSelected) return false

  const flag = await onboard.walletCheck()

  return flag
}

export const walletReset = async () => {
  await onboard.walletReset()
}

// export function initNotify() {
//   const notify = staging ? stagingNotify : Notify
//   return notify({
//     dappId,
//     networkId,
//     apiUrl,
//     onerror: error => console.log(`Notify error: ${error.message}`)
//   })
// }
