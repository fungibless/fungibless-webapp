
import { ethers } from "ethers";
export default class WalletModule {

    // Event Handlers
    #onProviderDetected;
    #onWalletInstalled;
    #onBalanceChanged;
    #onChainChanged;
    #onAccountChanged;

    // Private Members
    #address;
    #ethereum;
    #provider;
    #balance = 0;
    #connected = false;

    constructor(
        onProviderDetected_,
        onWalletInstalled_,
        onBalanceChanged_,
        onChainChanged_,
        onAccountChanged_) {

        this.#onProviderDetected = onProviderDetected_;
        this.#onWalletInstalled = onWalletInstalled_;
        this.#onBalanceChanged = onBalanceChanged_;
        this.#onChainChanged = onChainChanged_;
        this.#onAccountChanged = onAccountChanged_;

        this.#loadProvider();
    }

    #loadProvider() {
        if (window.ethereum) { // Check if wallet is installed.     
            this.#onProviderDetected(true)
            console.log("Wallet Provider Exists!", window.ethereum);
            this.#provider = new ethers.providers.Web3Provider(window.ethereum);
            const { provider: ethereum } = this.#provider;
            this.#ethereum = ethereum;

            console.log("Ethers Provider", this.#provider);
            console.log("Ethereum Provider", this.#ethereum);

            if (ethereum) { // Check if we can get installed web3 provider.     
                this.#addEventListeners(ethereum);
                // useDispatch(setInstalled({ installed: true, isMetaMask: ethereum.isMetaMask }))
                this.#onWalletInstalled({ installed: true, isMetaMask: ethereum.isMetaMask })
                this.#checkNetwork()
            }
        } else {
            this.#onProviderDetected(false)
        }
    }

    #addEventListeners(ethereum) {
        ethereum.on("chainChanged", this.#onChainChanged);
        ethereum.on("accountsChanged", this.#onAccountChanged);
    }

    #checkNetwork() {
        let callback = this.#onChainChanged;
        this.#ethereum.request({ method: 'eth_chainId', params: [] }).then(callback);
    }

    async connect() {
        let successCalback = this.#onAccountChanged;
        if (this.#ethereum) {
            const accounts = await this.#ethereum.request({ method: "eth_requestAccounts", params: [] });

            if (accounts && accounts.length > 0) {
                this.#connected = true;
                this.#loadBalance(accounts[0]);
                successCalback(accounts);
                return true;
            } else {
                this.#connected = false;
            }
        } else {
            this.#connected = false;
            console.error("Load ethers provider fisrt.");
        }

        return false;
    }

    async #loadBalance(account) {
        const contractUserBalance = await this.#provider.getBalance(account);
        const amount = ethers.utils.formatEther(contractUserBalance)
        console.log("onBalanceChanged:", this.#balance, " > ", amount)
        this.#onBalanceChanged(this.#balance, amount)
        this.#balance = amount        
    }

    async loadBalance() {
        if (this.#provider && this.#connected) {
            const signer = this.#provider.getSigner(); // user
            this.#address = await signer.getAddress()
            console.log("[WalletModule] Address:", this.#address)
            return this.#loadBalance(this.#address)
        } else {
            console.error("Load ethers provider fisrt or connect to your wallet.");
        }
    }
}