import * as React from "react"
import logo_img from '../../assets/images/logo.png'
import steps2_img from '../../assets/images/icons/steps2.png'
import steps_img from '../../assets/images/icons/steps.png'

const FooterSection = () => {
    return (
        <React.Fragment>
            <div className="gamfi-footer-section">
                <div className="footer-area">
                    <div className="container">
                        <div className="sec-heading text-center">
                            <div className="sub-inner mb-52 mb-mb-30">
                                <img className="heading-right-image" src={steps2_img} alt="steps" />
                                <span className="sub-title white-color">Find us on Social</span>
                                <img className="heading-left-image" src={steps_img} alt="steps" />
                            </div>
                        </div>
                        <div className="footer-listing text-center mb-100 md-mb-70 xs-mb-50">
                            <ul className="footer-icon-list">
                                <li><a href="/twitter"><i className="icon-twitter"/>&nbsp;</a></li>
                                <li><a href="/discord"><i className="icon-discord"/>&nbsp;</a></li>                                
                            </ul>
                        </div>
                        <div className="footer-logo text-center mb-45">
                            <img src={logo_img} alt="Footer-logo" />
                        </div>

                        <div className="copyright-area text-center mb-0">
                            <div className="dsc mb-37 md-mb-25">Copyright © 2022. All Rights Reserved by&nbsp;
                                <b>Fungibless</b>
                            </div>
                        </div>
                        <div className="scrollup text-center"></div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default FooterSection;