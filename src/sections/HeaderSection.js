import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link, navigate } from 'gatsby';
import imgLogo from '../assets/images/logo.png';
import imgConnect from '../assets/images/icons/connect.png';
import imgConnectWhite from '../assets/images/icons/connect_white.png';
import imgLogoDark from '../assets/images/logo-dark.png';
import imgMetaMask from '../assets/images/icons/meta-mask.png';
import { walletModule } from '../features/wallet';

function HeaderSection() {
  const walletConnected = useSelector((state) => state.wallet.connected);
  const walletInstalled = useSelector((state) => state.wallet.installed);
  const isMetaMask = useSelector((state) => state.wallet.isMetaMask);
  const rightNetwork = useSelector((state) => state.wallet.rightNetwork);
  const shortenAccount = useSelector((state) => state.wallet.shortenAccount);

  function switchNetwork() {
    walletModule.switchNetwork(
      parseInt(process.env.GATSBY_WALLET_NETWORK_CHAIN_ID, 16),
      {
        chainId: process.env.GATSBY_WALLET_NETWORK_CHAIN_ID,
        chainName: process.env.GATSBY_WALLET_NETWORK_CHAIN_NAME,
        nativeCurrency: {
          name: process.env.GATSBY_WALLET_NETWORK_NATIVE_CURRENCY_NAME,
          symbol: process.env.GATSBY_WALLET_NETWORK_NATIVE_SYMBOL,
          decimals: process.env.GATSBY_WALLET_NETWORK_NATIVE_DECIMALS,
        },
        rpcUrls: [process.env.GATSBY_WALLET_NETWORK_RPC_URL],
        blockExplorerUrls: [process.env.GATSBY_WALLET_NETWORK_BLOCK_EXPLORER_URLS],
      },
    );
  }

  return (
    <header id="gamfi-header" className="gamfi-header-section default-header">
      <div className="menu-area menu-sticky">
        <div className="container">
          <div className="heaader-inner-area d-flex justify-content-between align-items-center">
            <div className="gamfi-logo-area d-flex justify-content-between align-items-center">
              <div className="logo">
                <Link to="/">
                  <img src={imgLogo} alt="logo" />
                </Link>
              </div>
              <div className="header-menu">
                <ul className="nav-menu">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/tww">NFT</Link>
                    <ul className="sub-menu">
                      <li><Link to="/tww">Typical Wage Workers</Link></li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/staking">Staking</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="gamfi-btn-area">
              <ul>
                <li>
                  <a href="#!" id="nav-expander" className="nav-expander bar">
                    <div className="bar">
                      <span className="dot1" />
                      <span className="dot2" />
                      <span className="dot3" />
                    </div>
                  </a>
                </li>
                <li>
                  {
                    !walletInstalled
                    && (
                      <button type="button" className="readon white-btn hover-shape" onClick={() => { navigate('https://metamask.io/'); }}>
                        <img src={imgConnect} alt="Icon" />
                        <span className="btn-text">Install Wallet</span>
                        <span className="hover-shape1" />
                        <span className="hover-shape2" />
                        <span className="hover-shape3" />
                      </button>
                    )
                  }
                  {
                    walletInstalled && !rightNetwork
                    && (
                      <button type="button" className="readon white-btn hover-shape" onClick={switchNetwork}>
                        <img src={imgConnect} alt="Icon" />
                        <span className="btn-text">Wrong Network</span>
                        <span className="hover-shape1" />
                        <span className="hover-shape2" />
                        <span className="hover-shape3" />
                      </button>
                    )
                  }
                  {
                    walletInstalled && rightNetwork && !walletConnected
                    && (
                      <button type="button" className="readon white-btn hover-shape" data-bs-toggle="modal" data-bs-target="#modal">
                        <img src={imgConnect} alt="Icon" />
                        <span className="btn-text">Connect</span>
                        <span className="hover-shape1" />
                        <span className="hover-shape2" />
                        <span className="hover-shape3" />
                      </button>
                    )
                  }
                  {
                    walletInstalled && walletConnected && rightNetwork
                    && (
                      <button type="button" className="readon white-btn hover-shape" data-bs-toggle="modal" data-bs-target="#modal">
                        <img src={isMetaMask ? imgMetaMask : imgConnect} alt="Icon" />
                        <span className="btn-text">{shortenAccount}</span>
                        <span className="hover-shape1" />
                        <span className="hover-shape2" />
                        <span className="hover-shape3" />
                      </button>
                    )
                  }
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <nav className="right_menu_togle mobile-navbar-menu" id="mobile-navbar-menu">
        <div className="close-btn">
          <a href="#!" id="nav-close2" className="nav-close">
            <div className="line">
              <span className="line1" />
              <span className="line2" />
            </div>
          </a>
        </div>
        <div className="sidebar-logo mb-30">
          <Link to="/"><img src={imgLogoDark} alt="logo" /></Link>
        </div>
        <ul className="nav-menu">
          <li className="current-menu-item">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tww">NFT</Link>
            <ul className="sub-menu">
              <li><Link to="/tww">Typical Wage Workers</Link></li>
            </ul>
          </li>
          <li>
            <Link to="/staking">Staking</Link>
          </li>
          <li>
            <button type="button" className="readon black-shape-big connectWalletBtnforMobile" data-bs-toggle="modal" data-bs-target="#modal">
              <img src={imgConnectWhite} alt="connect" />
              <span className="btn-text">Connect </span>
              <span className="hover-shape1" />
              <span className="hover-shape2" />
              <span className="hover-shape3" />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderSection;
