import * as React from "react"
import logo_img from '../../assets/images/logo.png'
import connect_img from '../../assets/images/icons/connect.png'
import connect_white_img from '../../assets/images/icons/connect_white.png'
import logo_dark_img from '../../assets/images/logo-dark.png'
import meta_mask_img from '../../assets/images/icons/meta-mask.png'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import { Link, navigate } from 'gatsby'

import { ethers } from "ethers";

const HeaderSection = ({ headerType }) => {

    const walletConnected = useSelector((state) => state.wallet.connected)
    const walletInstalled = useSelector((state) => state.wallet.installed)
    const isMetaMask = useSelector((state) => state.wallet.isMetaMask)
    const rightNetwork = useSelector((state) => state.wallet.rightNetwork)
    const shortenAccount = useSelector((state) => state.wallet.shortenAccount)

    const switchNetwork = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const { provider: ethereum } = provider;

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

    return (
        <header id="gamfi-header" className={classnames("gamfi-header-section", headerType)}>
            <div className="menu-area menu-sticky">
                <div className="container">
                    <div className="heaader-inner-area d-flex justify-content-between align-items-center">
                        <div className="gamfi-logo-area d-flex justify-content-between align-items-center">
                            <div className="logo">
                                <Link to="/"><img src={logo_img} alt="logo" />&nbsp;</Link>
                            </div>
                            <div className="header-menu">
                                <ul className="nav-menu">
                                    <li><Link to="/">Home</Link>
                                    </li>
                                    <li><Link to="/tww">NFT</Link>
                                        <ul className="sub-menu">
                                            <li><Link to="/tww">Typical Wage Workers</Link></li>
                                            <li><Link to="/suc">Super Urban Cat</Link></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link to="/staking">Staking</Link>
                                    </li>
                                    <li>
                                        <Link to="/roadmap">Roadmap</Link>
                                    </li>
                                    <li>
                                        <Link to="/tokenomics">Tokenomics</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="gamfi-btn-area">
                            <ul>
                                <li>
                                    <a href="#!" id="nav-expander" className="nav-expander bar">
                                        <div className="bar">
                                            <span className="dot1"></span>
                                            <span className="dot2"></span>
                                            <span className="dot3"></span>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    {
                                        !walletInstalled &&
                                        <button type="button" className="readon white-btn hover-shape" onClick={() => { navigate("https://metamask.io/") }}><img src={connect_img} alt="Icon" />
                                            <span className="btn-text">Install Wallet</span>
                                            <span className="hover-shape1"></span>
                                            <span className="hover-shape2"></span>
                                            <span className="hover-shape3"></span>
                                        </button>
                                    }
                                    {
                                        walletInstalled && !rightNetwork &&
                                        <button type="button" className="readon white-btn hover-shape" onClick={switchNetwork}><img src={connect_img} alt="Icon" />
                                            <span className="btn-text">Wrong Network</span>
                                            <span className="hover-shape1"></span>
                                            <span className="hover-shape2"></span>
                                            <span className="hover-shape3"></span>
                                        </button>
                                    }
                                    {
                                        walletInstalled && rightNetwork && !walletConnected &&
                                        <button type="button" className="readon white-btn hover-shape" data-bs-toggle="modal" data-bs-target="#modal"><img src={connect_img} alt="Icon" />
                                            <span className="btn-text">Connect</span>
                                            <span className="hover-shape1"></span>
                                            <span className="hover-shape2"></span>
                                            <span className="hover-shape3"></span>
                                        </button>
                                    }
                                    {
                                        walletInstalled && walletConnected && rightNetwork &&
                                        <button type="button" className="readon white-btn hover-shape" data-bs-toggle="modal" data-bs-target="#modal"><img src={isMetaMask ? meta_mask_img : connect_img} alt="Icon" />
                                            <span className="btn-text">{shortenAccount}</span>
                                            <span className="hover-shape1"></span>
                                            <span className="hover-shape2"></span>
                                            <span className="hover-shape3"></span>
                                        </button>
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
                            <span className="line1"></span>
                            <span className="line2"></span>
                        </div>
                    </a>
                </div>
                <div className="sidebar-logo mb-30">
                    <Link to="/"><img src={logo_dark_img} alt="logo" /></Link>
                </div>
                <ul className="nav-menu">
                    <li className="current-menu-item"><a href="/">Home</a>
                    </li>
                    <li><Link to="/tww">NFT</Link>
                        <ul className="sub-menu">
                            <li><Link to="/tww">Typical Wage Workers</Link></li>
                            <li><Link to="/suc">Super Urban Cat</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/staking">Staking</Link>
                    </li>
                    <li><Link to="/roadmap">Roadmap</Link>
                    </li>
                    <li><Link to="/tokenomics">Tokenomics</Link>
                    </li>
                    <li>
                        <button type="button" className="readon black-shape-big connectWalletBtnforMobile" data-bs-toggle="modal" data-bs-target="#modal"><img src={connect_white_img} alt="connect" />
                            <span className="btn-text">Connect </span>
                            <span className="hover-shape1"></span>
                            <span className="hover-shape2"></span>
                            <span className="hover-shape3"></span>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default HeaderSection;