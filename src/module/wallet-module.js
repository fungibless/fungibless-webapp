
import { ethers } from "ethers";

export const desiredChainId = process.env.GATSBY_WALLET_NETWORK_CHAIN_ID

class WalletModule {

    constructor() {
        console.log("Wallet Module Constructed")
        this.loadProvider();
    }

    loadProvider() {
        if (window.ethereum) { // Check if wallet is installed.
            this.provider = new ethers.providers.Web3Provider(window.ethereum)
            const { provider: ethereum } = this.provider;
            this.ethereum = ethereum;

            console.log("Ethers Provider", this.provider);
            console.log("Ethereum Provider", this.ethereum);

            if (ethereum) { // Check if we can get installed web3 provider.     

            }
        }
    }
}

const walletModule = new WalletModule();
export default walletModule;