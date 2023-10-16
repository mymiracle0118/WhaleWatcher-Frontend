import {mapGetters, mapState} from "vuex";

const web3Modal = {
    computed: {
        ...mapState(['web3Modal']),
        ...mapGetters(['nftcontract']),
    },
    active() {
        return this.web3Modal.active
    }
}

const nftContract = {
    computed: {
        ...mapState(['nftcontract']),
    }
}

export {
    web3Modal,
    nftContract
}