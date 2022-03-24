import * as React from "react"
import meta_mask_img from '../../assets/images/icons/meta-mask.png'
import coinbase_img from '../../assets/images/icons/coinbase.png'
import trust_img from '../../assets/images/icons/trust.png'
import wallet_img from '../../assets/images/icons/wallet.png'

const ModalSection = () => {
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
                                <li><a href="#!"><span><img src={meta_mask_img} alt="Meta-mask"/></span>MetaMask</a></li>
                                <li><a href="#!"><span><img src={coinbase_img} alt="Coinbase"/></span>Coinbase</a></li>
                                <li><a href="#!"><span><img src={trust_img} alt="Trust"/></span>Trust Wallet</a></li>
                                <li><a href="#!"><span><img src={wallet_img} alt="Wallet"/></span>WalletConnect</a></li>
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

export default ModalSection;