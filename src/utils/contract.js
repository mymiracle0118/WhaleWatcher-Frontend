import {nftcontractABI} from "../config/abi/nftcontractabi";
import {ethers} from "ethers";
import {simpleRpcProvider} from "@/utils/web3";
import store from '@/store'

export const getNftContract = async (address) => {
    const {library} = store.state.web3Modal
    const signer = await library.getSigner()
    // console.log("signer", signer)
    return getContract(nftcontractABI, address, signer)
}

const getContract = (abi, address, signer = null) => {
    const signerOrProvider = signer ?? simpleRpcProvider
    return new ethers.Contract(address, abi, signerOrProvider)
}