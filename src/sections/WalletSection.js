/* eslint-disable no-console */
import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

import { WalletModule, WalletKind, ethers } from '@fungibless/wallet-module';
import { useSelector, useDispatch } from 'react-redux';
import { isMobile } from 'react-device-detect';
import metaMaskImg from '../assets/images/icons/meta-mask.png';

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

  const initializeWallet = React.useCallback((walletKind) => {
    walletModule
      .bindOnWalletInstalledListeners(({ installed, kind }) => {
        console.log(`wallet installed: ${installed} kind: ${WalletKind[kind]}`);
        dispatch(setInstalled({ installed, isMetaMask: kind === WalletKind.MetaMask }));
      })
      .bindOnChainConnectedListeners(({ chainId, name }) => {
        console.log('chain connected chainId:', chainId, ' name:', name);
        dispatch(
          setChainIdAndRightNetwork({
            chainId,
            right: chainId === parseInt(process.env.GATSBY_WALLET_NETWORK_CHAIN_ID, 16),
          }),
        );
      })
      .bindOnChainChangedListeners(({ chainId }) => {
        console.log('chain changed chainId:', chainId);
        window.location.reload();
      })
      .bindOnAccountChangedListeners(({ account }) => {
        console.log('connected', account);
        const s = walletModule.shortenAddress;
        dispatch(setConnectedAndAccount({ connected: true, account, shortenAccount: s }));
        closeButton.current.click();
      })
      .bindOnAccountConnectCanceledListeners(() => {
        console.log('user canceled');
        dispatch(setInteracting(false));
      })
      .bindOnBalanceChangedListeners((amount) => {
        console.log(`this is amount : ${amount}`);
        dispatch(setBalance({ eth: amount.toString() }));
      })
      .bindOnDisconnectedListeners(() => {
        console.log('disconnected');
        dispatch(setConnectedAndAccount({ connected: false, account: null }));
        closeButton.current.click();
      })
      .initialize(walletKind);
  }, [walletModule]);

  function connect() {
    if (isMobile) {
      window.location.href = 'https://metamask.app.link/dapp/www.fungibless.xyz/tww';
      return;
    }

    if (walletConnected) {
      walletModule.disconnect();
    } else {
      walletModule.connect();
    }
  }

  React.useEffect(() => {
    try {
      initializeWallet(WalletKind.MetaMask);
    } catch (err) {
      console.error(err);
    }
    if (rightNetwork) {
      connect();
    }
  }, [initializeWallet, rightNetwork]);

  return (
    <div className="modal fade " id="modal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modals-title mb-0" id="modalLabel">Connect Wallet</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeButton}><i className="icon-x" /></button>
          </div>
          <div className="modal-body">
            <p className="mb-20">Please click MetaMask to connect to Fungibless.</p>
            <div className="connect-section">
              <ul className="heading-list">
                <li style={(walletConnected && isMetaMask) ? { background: 'green' } : {}}>
                  <a
                    href="#!"
                    onClick={connect}
                    style={{
                      textDecoration: 'none', display: 'block', width: '100%', height: '100%',
                    }}
                  >
                    <span><img src={metaMaskImg} alt="MetaMask" /></span>
                    <span style={{ color: 'white' }}>{(walletConnected && isMetaMask) ? shortenAccount : 'MetaMask'}</span>

                  </a>
                </li>
              </ul>
            </div>
            {/* <p>
              By connecting your wallet, you agree to our&nbsp;
              <span className="modal-title">Terms of Service</span>
              &nbsp;and our&nbsp;
              <span className="modal-title">Privacy Policy</span>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletSection;
