/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

export default class WalletModule {
    // Event Handlers
    _onProviderDetected;

    _onWalletInstalled;

    _onBalanceChanged;

    _onChainChanged;

    _onAccountChanged;

    _onConnectUserCancel;

    // Private Members
    _address;

    _ethereumProvider;

    _ethers;

    _balance = 0;

    _connected = false;

    async initialize(
      onProviderDetected_,
      onWalletInstalled_,
      onBalanceChanged_,
      onChainChanged_,
      onAccountChanged_,
      onConnectUserCancel_,
    ) {
      if (typeof window !== 'undefined') {
        this._onProviderDetected = onProviderDetected_;
        this._onWalletInstalled = onWalletInstalled_;
        this._onBalanceChanged = onBalanceChanged_;
        this._onChainChanged = onChainChanged_;
        this._onAccountChanged = onAccountChanged_;
        this._onConnectUserCancel = onConnectUserCancel_;

        const ethereumProvider = await detectEthereumProvider();

        if (ethereumProvider) { // Check if wallet is installed.
          this._handleEthereum(ethereumProvider);
        }
      }
    }

    _handleEthereum(ethereumProvider) {
      if (ethereumProvider) {
        this._onProviderDetected(true);
        this._ethereumProvider = ethereumProvider;
        this._ethers = new ethers.providers.Web3Provider(ethereumProvider);

        console.log('Browser Web3 Wallet Provider', this._ethereumProvider);
        console.log('Ethers Provider', this._ethers);

        if (this._ethers) { // Check if we can get installed web3 provider.
          this._addDefaultEventListeners();
          this._onWalletInstalled({ installed: true, isMetaMask: ethereumProvider.isMetaMask });
          this._checkNetwork();
        }
      } else {
        this._onProviderDetected(false);
      }
    }

    _addDefaultEventListeners() {
      this._ethers.on('chainChanged', this._onChainChanged);
      this._ethers.on('accountsChanged', this._onAccountChanged);
    }

    _checkNetwork() {
      this._ethers.getNetwork().then(this._onChainChanged);
    }

    get ethers() {
      return this._ethers;
    }

    get balance() {
      return this._balance;
    }

    async connect() {
      const successCalback = this._onAccountChanged;
      if (this._ethereumProvider) {
        try {
          const accounts = await this._ethereumProvider.request({ method: 'eth_requestAccounts', params: [] });

          if (accounts && accounts.length > 0) {
            this._connected = true;
            this._loadBalance(accounts[0]);
            successCalback(accounts);
            return true;
          }
          this._connected = false;
        } catch (err) {
          console.log('User Connect Cancel', err);
          this._onConnectUserCancel();
        }
      } else {
        this._connected = false;
        console.error('Load ethers provider fisrt.');
      }

      return false;
    }

    async _loadBalance(account) {
      const contractUserBalance = await this._ethers.getBalance(account);
      const amount = ethers.utils.formatEther(contractUserBalance);
      console.log('onBalanceChanged:', this._balance, ' > ', amount);
      this._onBalanceChanged(this._balance, amount);
      this._balance = amount;
      return amount;
    }

    async loadBalance() {
      if (this._ethers && this._connected) {
        const signer = this._ethers.getSigner(); // user
        this._address = await signer.getAddress();
        console.log('[WalletModule] Address:', this._address);
        return this._loadBalance(this._address);
      }
      console.warn('Load ethers provider fisrt or connect to your wallet.');
      return ethers.utils.formatEther('0');
    }

    async switchNetwork() {
      const ethereum = this._ethereumProvider;
      if (ethereum) {
        try {
          await ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: process.env.GATSBY_WALLET_NETWORK_CHAIN_ID }] });
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
                    decimals: parseInt(process.env.GATSBY_WALLET_NETWORK_NATIVE_DECIMALS, 10),
                  },
                  rpcUrls: [process.env.GATSBY_WALLET_NETWORK_RPC_URL],
                  blockExplorerUrls: [process.env.GATSBY_WALLET_NETWORK_BLOCK_EXPLORER_URLS],
                },
              ],
            });
          } catch (addError) {
            console.log(addError);
          }
        }
      }
    }

    static shortenWalletAddress(address) {
      return `${address.substring(0, 5)}...${address.substr(address.length - 4)}`;
    }
}
