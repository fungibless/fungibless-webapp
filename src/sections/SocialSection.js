import * as React from 'react';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import Section from '../components/Section';
import imgSteps2 from '../assets/images/icons/steps2.png';

function SocialSection() {
  return (
    <Section className="gamfi-team-section pt-115 pb-85 md-pt-75 md-pb-42">
      <div className="container">
        <div className="sec-heading text-center mb-55">
          <div className="sub-inner  mb-15">
            <img className="heading-left-image" src={imgSteps2} alt="steps" />
            <span className="ml-10 mr-10 sub-title">FIND US ON SOCIAL</span>
            <img className="heading-right-image" src={imgSteps2} alt="steps" />
          </div>
        </div>
        <div className="footer-listing text-center mb-100 md-mb-70 xs-mb-50">
          <ul className="footer-icon-list">
            <li><OutboundLink href="https://discord.gg/HymuNn97uy" target="_blank"><i className="icon-discord" /></OutboundLink></li>
            <li><OutboundLink href="https://twitter.com/syous_seo" target="_blank"><i className="icon-twitter" /></OutboundLink></li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

export default SocialSection;
