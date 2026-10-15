import * as React from 'react';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import Section from '../components/Section';
import imgSteps2 from '../assets/images/icons/steps2.png';
import imgDiscordLogo from '../assets/images/icons/discord-logo.png';
import imgTwitterLogo from '../assets/images/icons/twitter-logo.png';
import imgRaribleLogo from '../assets/images/icons/rarible-logo.png';

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
            <li><OutboundLink href="https://discord.gg/CmbNCjprBA" target="_blank"><img width="100px" height="100px" src={imgDiscordLogo} alt="discord" style={{ paddingRight: '5px' }} /></OutboundLink></li>
            <li><OutboundLink href="https://twitter.com/teamfungibless" target="_blank"><img width="100px" height="100px" src={imgTwitterLogo} alt="twitter" style={{ paddingRight: '5px' }} /></OutboundLink></li>
            <li><OutboundLink href="https://og.rarible.com/collection/polygon/0xcf19c108819b84c730d4ea20b363e6c81d6a7cf2/items" target="_blank"><img width="100px" height="100px" src={imgRaribleLogo} alt="rarible" /></OutboundLink></li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

export default SocialSection;
