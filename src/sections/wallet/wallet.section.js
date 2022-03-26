import * as React from "react"
import meta_mask_img from '../../assets/images/icons/meta-mask.png'
import coinbase_img from '../../assets/images/icons/coinbase.png'
import trust_img from '../../assets/images/icons/trust.png'
import wallet_img from '../../assets/images/icons/wallet.png'

import { ethers } from "ethers";

import { useSelector, useDispatch } from 'react-redux'
import { setConnectedAndAccount, setAccount, setInstalled, setChainIdAndRightNetwork } from "../../features/wallet-slice"

const WalletSection = () => {
    const dispatch = useDispatch()
    const walletInstalled = useSelector((state) => state.wallet.installed)

    React.useEffect(() => {
        const desiredChainId = 80001

        const checkNetwork = (provider) => {
            provider.send('eth_chainId', []).then((chainId) => {
                console.log("chainId:", chainId.result)
                let c = parseInt(chainId.result, 16)
                dispatch(setChainIdAndRightNetwork({ chainId: c, right: (c === desiredChainId) }))
            });
        }

        const checkConnected = (provider) => {
            provider.send("eth_requestAccounts", []).then((accounts) => {                
                if (accounts.result) {
                    dispatch(setConnectedAndAccount({ connected: true, account: accounts.result[0] }))
                }
            })
        }

        if (window.ethereum) { // Check if wallet is installed.
            const web3 = new ethers.providers.Web3Provider(window.ethereum)
            if (web3.provider) { // Check if we can get installed web3 provider.     
                dispatch(setInstalled(true))
                //Add wallet event listeners
                web3.provider.on("chainChanged", (chainId) => {
                    console.log("chainChanged", chainId)
                    checkNetwork(web3.provider)
                })

                web3.provider.on("accountsChanged", (accounts) => {
                    if (accounts.length > 0) {
                        console.log("accountsChanged", accounts)
                        dispatch(setAccount(accounts[0]))
                    } else {
                        console.warn("Wallet disconnected")
                        dispatch(setConnectedAndAccount({ connected: false, account: null }))
                    }
                })

                // Trying to get account from the provider.
                checkNetwork(web3.provider)
                checkConnected(web3.provider)
                // getAccount(web3.provider)
            }

        } else {
            dispatch(setInstalled(false))
            //after install the provider. the browser needs to be refreshed. plase notify users about it
        }


    }, [dispatch]);

    const connectToWallet = () => {
        if (walletInstalled) {
            try {
                const web3 = new ethers.providers.Web3Provider(window.ethereum)
                web3.provider.request("eth_requestAccounts", []).then((accounts) => {
                    console.log(accounts.result)
                    if (accounts.result) {
                        dispatch(setConnectedAndAccount({ connected: true, account: accounts.result[0] }))
                    }
                })
            } catch (error) {
                dispatch(setConnectedAndAccount({ connected: false, account: null }))
            }
        } else {
            console.warn("There is no wallet")
        }

    }

    return (
        <div className="modal fade " id="modal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modals-title  mb-0" id="modalLabel">Connect Wallet</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="icon-x"></i></button>
                    </div>
                    <div className="modal-body">
                        <p className="mb-20">Please select a wallet to connect to this marketplace</p>
                        <div className="connect-section">
                            <ul className="heading-list">
                                <li><a href="#!" onClick={() => { connectToWallet() }}><span><img src={meta_mask_img} alt="Meta-mask" /></span>MetaMask</a></li>
                                <li><a href="#!"><span><img src={coinbase_img} alt="Coinbase" /></span>Coinbase</a></li>
                                <li><a href="#!"><span><img src={trust_img} alt="Trust" /></span>Trust Wallet</a></li>
                                <li><a href="#!"><span><img src={wallet_img} alt="Wallet" /></span>WalletConnect</a></li>
                            </ul>
                        </div>
                        <p>By connecting your wallet, you agree to our <a href="#!"><span className="modal-title">Terms of Service </span>
                        </a>and our <a href="#!"><span className="modal-title"> Privacy Policy</span></a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletSection;