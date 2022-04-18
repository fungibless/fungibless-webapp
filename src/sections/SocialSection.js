import * as React from "react"
import Section from "../components/Section"
import steps2_img from '../assets/images/icons/steps2.png'
import { OutboundLink } from "gatsby-plugin-google-gtag";

const SocialSection = () => {
    return (
        <Section className="gamfi-team-section pt-115 pb-85 md-pt-75 md-pb-42">
            <div className="container">
                <div className="sec-heading text-center mb-55">
                    <div className="sub-inner  mb-15">
                        <img className="heading-left-image" src={steps2_img} alt="steps" />
                        <span className="ml-10 mr-10 sub-title">FIND US ON SOCIAL</span>
                        <img className="heading-right-image" src={steps2_img} alt="steps" />
                    </div>
                </div>
                <div className="footer-listing text-center mb-100 md-mb-70 xs-mb-50">
                    <ul className="footer-icon-list">
                        <li><OutboundLink href="https://discord.gg/HymuNn97uy" target="_blank"><i className="icon-discord"></i></OutboundLink></li>
                        <li><OutboundLink href="https://twitter.com/syous_seo" target="_blank"><i className="icon-twitter"></i></OutboundLink></li>
                        {/* <li><a href="#"><i className="icon-telegram"></i></a></li> */}
                        {/* <li><a href="#"><i className="icon-medium"></i></a></li> */}

                        {/* <li><a href="#"><i className="icon-linkedin"></i></a></li> */}
                        {/* <li><a href="#"><i className="icon-instagram"></i></a></li> */}
                        {/* <li><a href="#"><i className="icon-facebook"></i></a></li> */}
                    </ul>
                </div>
            </div>
        </Section>
    )
};

export default SocialSection