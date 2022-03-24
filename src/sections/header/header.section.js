import * as React from "react"
import logo_img from '../../assets/images/logo.png'
import connect_img from '../../assets/images/icons/connect.png'

const HeaderSection = () => {
    return (
        <header id="gamfi-header" className="gamfi-header-section transparent-header">
            <div className="menu-area menu-sticky">
                <div className="container">
                    <div className="heaader-inner-area d-flex justify-content-between align-items-center">
                        <div className="gamfi-logo-area d-flex justify-content-between align-items-center">
                            <div className="logo">
                                <a href="index.html"><img src={logo_img} alt="logo" /></a>
                            </div>
                            <div className="header-menu">
                                <ul className="nav-menu">
                                    <li><a href="index.html">Home</a>
                                        <ul className="sub-menu">
                                            <li><a href="index.html">Home 1</a></li>
                                            <li><a href="index2.html">Home 2</a></li>
                                            <li><a href="index-V3.html">Home 3</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="project.html">Projects</a>
                                        <ul className="sub-menu">
                                            <li><a href="project.html">Projects List</a></li>
                                            <li><a href="explore.html">Projects Grid</a></li>
                                            <li><a href="calendar.html">Project Calendar</a></li>
                                            <li><a href="project-details.html">Project Details</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="gamfi-btn-area">
                            <ul>
                                <li>
                                    <a id="nav-expander" className="nav-expander bar" href="#">
                                        <div className="bar">
                                            <span className="dot1"></span>
                                            <span className="dot2"></span>
                                            <span className="dot3"></span>
                                        </div>
                                    </a>
                                </li>                               
                                <li>
                                    <button type="button" className="readon white-btn hover-shape" data-bs-toggle="modal" data-bs-target="#modal"><img src={connect_img} alt="Icon"/>
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
        </header>
    );
};

export default HeaderSection;