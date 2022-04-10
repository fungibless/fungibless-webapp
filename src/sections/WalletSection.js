import * as React from "react"
import meta_mask_img from '../assets/images/icons/meta-mask.png'

import WalletModule from "../module/wallet-module"
import { useSelector, useDispatch } from 'react-redux'
import { setConnectedAndAccount, setBalance, setInstalled, setChainIdAndRightNetwork } from "../features/wallet-slice"

export const walletModule = new WalletModule();

const WalletSection = () => {
    const dispatch = useDispatch()
    const walletConnected = useSelector((state) => state.wallet.connected)

    const isMetaMask = useSelector((state) => state.wallet.isMetaMask)
    const shortenAccount = useSelector((state) => state.wallet.shortenAccount)
    const closeButton = React.useRef()

    walletModule.initialize(
        onProviderDetected,
        onWalletInstalled,
        onBalanceChanged,
        onChainChanged,
        onAccountChanged);

    function onProviderDetected(detected) {
        console.log("onProivderDetected:", detected)
    }

    function onWalletInstalled(msg) {
        dispatch(setInstalled(msg))
    }

    function onBalanceChanged(from, to) {
        dispatch(setBalance({ eth: to }))
    }

    function onChainChanged(chainId) {
        dispatch(setChainIdAndRightNetwork({ chainId: chainId, right: (chainId === process.env.GATSBY_WALLET_NETWORK_CHAIN_ID) }))
    }

    function onAccountChanged(accounts) {
        if (accounts && accounts.length > 0) {
            dispatch(setConnectedAndAccount({ connected: true, account: accounts[0] }))            
            closeButton.current.click();
        } else {
            dispatch(setConnectedAndAccount({ connected: false, account: null }))
        }
    }

    return (
        <div className="modal fade " id="modal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modals-title  mb-0" id="modalLabel">Connect Wallet</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeButton}><i className="icon-x"></i></button>
                    </div>
                    <div className="modal-body">
                        <p className="mb-20">Please select a wallet to connect to this marketplace</p>
                        <div className="connect-section">
                            <ul className="heading-list">
                                <li style={(walletConnected && isMetaMask) ? { background: 'green' } : {}}><a href="#!" onClick={() => { walletModule.connect() }}><span><img src={meta_mask_img} alt="MetaMask" /></span>{(walletConnected && isMetaMask) ? shortenAccount : 'MetaMask'}</a></li>                                
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