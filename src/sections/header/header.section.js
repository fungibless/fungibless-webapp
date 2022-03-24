import * as React from "react"
import logo_img from '../../assets/images/logo.png'
import connect_img from '../../assets/images/icons/connect.png'
import connect_white_img from '../../assets/images/icons/connect_white.png'
import logo_dark_img from '../../assets/images/logo-dark.png'
import classnames from 'classnames'

const HeaderSection = ({headerType}) => {
    return (
        <header id="gamfi-header" className={classnames("gamfi-header-section", headerType)}>
            <div className="menu-area menu-sticky">
                <div className="container">
                    <div className="heaader-inner-area d-flex justify-content-between align-items-center">
                        <div className="gamfi-logo-area d-flex justify-content-between align-items-center">
                            <div className="logo">
                                <a href="/"><img src={logo_img} alt="logo" /></a>
                            </div>
                            <div className="header-menu">
                                <ul className="nav-menu">
                                    <li><a href="/">Home</a>
                                    </li>
                                    <li><a href="#!">NFT</a>
                                        <ul className="sub-menu">
                                            <li><a href="/tww">Typical Wage Workers</a></li>
                                            <li><a href="/suc">Super Urban Cat</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="/staking">Staking</a>
                                    </li>
                                    <li>
                                        <a href="/roadmap">Roadmap</a>
                                    </li>
                                    <li>
                                        <a href="/tokenomics">Tokenomics</a>
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
                                    <button type="button" className="readon white-btn hover-shape" data-bs-toggle="modal" data-bs-target="#modal"><img src={connect_img} alt="Icon" />
                                        <span className="btn-text">Connect </span>
                                        <span className="hover-shape1"></span>
                                        <span className="hover-shape2"></span>
                                        <span className="hover-shape3"></span>
                                    </button>
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
                    <a href="index.html"><img src={logo_dark_img} alt="logo" /></a>
                </div>
                <ul className="nav-menu">
                    <li className="current-menu-item"><a href="/">Home</a>                       
                    </li>
                    <li><a href="#!">NFT</a>
                        <ul className="sub-menu">
                            <li><a href="/tww">Typical Wage Workers</a></li>
                            <li><a href="/suc">Super Urban Cat</a></li>
                        </ul>
                    </li>
                    <li><a href="/staking">Staking</a>                        
                    </li>
                    <li><a href="/roadmap">Roadmap</a>                        
                    </li>
                    <li><a href="/tokenomics">Tokenomics</a>                        
                    </li>
                    <li>
                        <button type="button" className="readon black-shape-big connectWalletBtnforMobile" data-bs-toggle="modal" data-bs-target="#exampleModal"><img src={connect_white_img} alt="connect" />
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