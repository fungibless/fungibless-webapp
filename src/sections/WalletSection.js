/* eslint-disable no-console */
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isMobile } from 'react-device-detect';
import metaMaskImg from '../assets/images/icons/meta-mask.png';

import WalletModule from '../module/wallet-module';
import {
  setConnectedAndAccount, setBalance, setInstalled, setChainIdAndRightNetwork, setInteracting,
} from '../features/wallet-slice';

export const walletModule = new WalletModule();

function WalletSection() {
  const dispatch = useDispatch();
  const walletConnected = useSelector((state) => state.wallet.connected);
  const rightNetwork = useSelector((state) => state.wallet.rightNetwork);
  const isMetaMask = useSelector((state) => state.wallet.isMetaMask);
  const shortenAccount = useSelector((state) => state.wallet.shortenAccount);
  const closeButton = React.useRef();

  function onProviderDetected(detected) {
    console.log('onProivderDetected:', detected);
  }

  function onWalletInstalled(msg) {
    console.log('onWalletInstalled:', msg);
    dispatch(setInstalled(msg));
  }

  function onBalanceChanged(from, to) {
    dispatch(setBalance({ eth: to }));
  }

  function onNetwork({ chainId, name }) {
    console.log(
      'onNetwork chainId:',
      chainId,
      ' name:',
      name,
      ' desired:',
      parseInt(process.env.GATSBY_WALLET_NETWORK_CHAIN_ID, 16),
    );
    dispatch(
      setChainIdAndRightNetwork({
        chainId,
        right: chainId === parseInt(process.env.GATSBY_WALLET_NETWORK_CHAIN_ID, 16),
      }),
    );
  }

  function onChainChanged({ chainId, name }) {
    console.log('onChainChanged chainId:', chainId, ' name:', name);
    window.location.reload();
  }

  function onAccountChanged(accounts) {
    if (accounts && accounts.length > 0) {
      dispatch(setConnectedAndAccount({ connected: true, account: accounts[0] }));
      closeButton.current.click();
    } else {
      dispatch(setConnectedAndAccount({ connected: false, account: null }));
    }
  }

  function onConnectUserCancel() {
    dispatch(setInteracting(false));
  }

  walletModule.initialize(
    onProviderDetected,
    onWalletInstalled,
    onBalanceChanged,
    onNetwork,
    onChainChanged,
    onAccountChanged,
    onConnectUserCancel,
  );

  function connect() {
    if (walletConnected) return;

    if (isMobile) {
      window.location.href = 'https://metamask.app.link/dapp/www.fungibless.xyz/tww';
    } else {
      walletModule.connect();
    }
  }

  React.useEffect(() => {
    console.log(rightNetwork);
    if (rightNetwork) {
      connect();
    }
  }, [rightNetwork]);

  return (
    <div className="modal fade " id="modal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modals-title mb-0" id="modalLabel">Connect Wallet</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeButton}><i className="icon-x" /></button>
          </div>
          <div className="modal-body">
            <p className="mb-20">Please select a wallet to connect to this marketplace</p>
            <div className="connect-section">
              <ul className="heading-list">
                <li style={(walletConnected && isMetaMask) ? { background: 'green' } : {}}>
                  <a href="#!" onClick={connect}>
                    <span><img src={metaMaskImg} alt="MetaMask" /></span>
                    <span style={{ fontWeight: 'bold', color: 'white' }}>{(walletConnected && isMetaMask) ? shortenAccount : 'MetaMask'}</span>
                  </a>
                </li>
              </ul>
            </div>
            <p>
              By connecting your wallet, you agree to our
              <span className="modal-title">Terms of Service </span>
              and our
              {' '}
              <span className="modal-title"> Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletSection;
