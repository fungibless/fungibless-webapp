
import { ethers } from "ethers";
import detectEthereumProvider from '@metamask/detect-provider'
export default class WalletModule {

    // Event Handlers
    _onProviderDetected;
    _onWalletInstalled;
    _onBalanceChanged;
    _onChainChanged;
    _onAccountChanged;

    // Private Members
    _address;
    _ethereum;
    _provider;
    _balance = 0;
    _connected = false;

    async initialize(
        onProviderDetected_,
        onWalletInstalled_,
        onBalanceChanged_,
        onChainChanged_,
        onAccountChanged_) {

        if (typeof window !== "undefined") {
            this._onProviderDetected = onProviderDetected_;
            this._onWalletInstalled = onWalletInstalled_;
            this._onBalanceChanged = onBalanceChanged_;
            this._onChainChanged = onChainChanged_;
            this._onAccountChanged = onAccountChanged_;

            const provider = await detectEthereumProvider()

            if (provider) { // Check if wallet is installed.     
                this._handleEthereum(provider);
            }            
        }
    }

    _handleEthereum(provider) {
        if (provider) {
            this._onProviderDetected(true)
            console.log("Wallet Provider Exists!", provider);
            this._provider = new ethers.providers.Web3Provider(provider);
            const { provider: ethereum } = this._provider;
            this._ethereum = ethereum;

            console.log("Ethers Provider", this._provider);
            console.log("Ethereum Provider", this._ethereum);

            if (ethereum) { // Check if we can get installed web3 provider.     
                this._addEventListeners(ethereum);
                // useDispatch(setInstalled({ installed: true, isMetaMask: ethereum.isMetaMask }))
                this._onWalletInstalled({ installed: true, isMetaMask: ethereum.isMetaMask })
                this._checkNetwork()
            }
        } else {
            this._onProviderDetected(false)
        }
    }

    _addEventListeners(ethereum) {
        ethereum.on("chainChanged", this._onChainChanged);
        ethereum.on("accountsChanged", this._onAccountChanged);
    }

    _checkNetwork() {
        let callback = this._onChainChanged;
        this._ethereum.request({ method: 'eth_chainId', params: [] }).then(callback);
    }

    get balance() {
        return this.balance;
    }

    async connect() {
        let successCalback = this._onAccountChanged;
        if (this._ethereum) {
            const accounts = await this._ethereum.request({ method: "eth_requestAccounts", params: [] });

            if (accounts && accounts.length > 0) {
                this._connected = true;
                this._loadBalance(accounts[0]);
                successCalback(accounts);
                return true;
            } else {
                this._connected = false;
            }
        } else {
            this._connected = false;
            console.error("Load ethers provider fisrt.");
        }

        return false;
    }

    async _loadBalance(account) {
        const contractUserBalance = await this._provider.getBalance(account);
        const amount = ethers.utils.formatEther(contractUserBalance)
        console.log("onBalanceChanged:", this._balance, " > ", amount)
        this._onBalanceChanged(this._balance, amount)
        this._balance = amount
    }

    async loadBalance() {
        if (this._provider && this._connected) {
            const signer = this._provider.getSigner(); // user
            this._address = await signer.getAddress()
            console.log("[WalletModule] Address:", this._address)
            return this._loadBalance(this._address)
        } else {
            console.error("Load ethers provider fisrt or connect to your wallet.");
        }
    }

    async switchNetwork() {
        const ethereum = this._ethereum;
        if (ethereum) {
            try {
                await ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: process.env.GATSBY_WALLET_NETWORK_CHAIN_ID }] })
            } catch (switchError) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: process.env.GATSBY_WALLET_NETWORK_CHAIN_ID,
                                chainName: process.env.GATSBY_WALLET_NETWORK_CHAIN_NAME,
                                nativeCurrency: {
                                    name: process.env.GATSBY_WALLET_NETWORK_NATIVE_CURRENCY_NAME,
                                    symbol: process.env.GATSBY_WALLET_NETWORK_NATIVE_SYMBOL,
                                    decimals: parseInt(process.env.GATSBY_WALLET_NETWORK_NATIVE_DECIMALS)
                                },
                                rpcUrls: [process.env.GATSBY_WALLET_NETWORK_RPC_URL],
                                blockExplorerUrls: [process.env.GATSBY_WALLET_NETWORK_BLOCK_EXPLORER_URLS]
                            }
                        ],
                    });
                } catch (addError) {
                    console.log(addError);
                }
            }
        }
    }

    static shortenWalletAddress(address) {
        return address.substring(0, 5) + "..." + address.substr(address.length - 4)
    }
}