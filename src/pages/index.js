import * as React from "react"
import Layout from "./layout"
import icon1_img from '../assets/images/icons/icon1.png'
import steps_img from '../assets/images/icons/steps.png'
import steps2_img from '../assets/images/icons/steps2.png'
import tokenomics_img from '../assets/images/project/tokenomices-image.jpg'
import team_img from '../assets/images/team/team-image.png'
import team2_img from '../assets/images/team/team-image2.png'
import team3_img from '../assets/images/team/team-image3.png'
import team4_img from '../assets/images/team/team-image4.png'
import team5_img from '../assets/images/team/team-image5.png'
import team6_img from '../assets/images/team/team-image6.png'
import team7_img from '../assets/images/team/team-image7.png'
import team8_img from '../assets/images/team/team-image8.png'

const IndexPage = () => {
  return (
    <Layout headerType="transparent-header">
      <div id="sc-banner" className="sc-banner banner-bg position-relative">
        <div className="container">
          <div className="banner-content text-center">
            <img className="banner-icon wow fadeInUp" data-wow-delay="300ms" data-wow-duration="2500ms" src={icon1_img} alt="icon" />
            <h1 className="banner-title wow fadeInUp" data-wow-delay="300ms" data-wow-duration="2500ms">
              Fun challenges in the blockchain world.
            </h1>
            <div className="description wow fadeInUp" data-wow-delay="300ms" data-wow-duration="2500ms">
              community-based blockchain experiments such as NFTs, tokens, and staking. challenge together and share together.
            </div>
            <a className="banner-btn wow fadeInUp black-shape-big" data-wow-delay="300ms" data-wow-duration="2500ms" href="https://opensea.io/collection/superurbancat" target="_blank" rel="noreferrer">
              <span className="btn-text">Explore Collections</span>
              <span className="hover-shape1"></span>
              <span className="hover-shape2"></span>
              <span className="hover-shape3"></span>
            </a>
          </div>
        </div>
      </div>

      <div className="gamfi-tokenomics-section tokenomics-left-right-shape pb-115 pt-115 md-pt-75 md-pb-45">
        <div className="container">
          <div className="sec-heading">
            <div className="sub-inner mb-15">
              <span className="sub-title">statistics</span>
              <img className="heading-left-image" src={steps_img} alt="steps" />
            </div>
            <h2 className="title">Tokenomics</h2>
          </div>
          <div className="tokenomics-item d-flex">
            <div className="tokenomics-menu pr-60">
              <div className="dsc">Team</div>
              <h5>7.5%</h5>
            </div>
            <div className="tokenomics-menu pr-63">
              <div className="dsc">Staking</div>
              <h5>9.50%</h5>
            </div>
            <div className="tokenomics-menu pr-65">
              <div className="dsc">Advisors</div>
              <h5>10.00%</h5>
            </div>
            <div className="tokenomics-menu pr-95">
              <div className="dsc">Liquidity</div>
              <h5>12.00%</h5>
            </div>
            <div className="tokenomics-menu pr-105">
              <div className="dsc">Ecosystem</div>
              <h5>16.33%</h5>
            </div>
            <div className="tokenomics-menu pr-122">
              <div className="dsc">Marketing</div>
              <h5>18.00%</h5>
            </div>
            <div className="tokenomics-menu">
              <div className="dsc">Private Sale</div>
              <h5>30.00%</h5>
            </div>
          </div>
          <div className="tokenomics-image mb-60 md-mb-40">
            <img src={tokenomics_img} alt="tokenomics" />
          </div>
          <div className="tokenomics-counter">
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-30">
                <div className="counter-info">
                  <h4 className="counter-number mb-6"><span className="counter">386</span></h4>
                  <h5>Funded Projects</h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-30">
                <div className="counter-info">
                  <h4 className="counter-number mb-6"><span className="counter">486</span></h4>
                  <h5>Unique Participants</h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-30">
                <div className="counter-info">
                  <h4 className="counter-number mb-6">$<span className="counter">9</span>M+</h4>
                  <h5>Raised Capital</h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-30">
                <div className="counter-info">
                  <h4 className="counter-number mb-6">$<span className="counter">18</span>M+</h4>
                  <h5>Initial Market Cap</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="gamfi-team-section pt-115 pb-85 md-pt-75 md-pb-42">
        <div className="container">
          <div className="sec-heading text-center mb-55">
            <div className="sub-inner  mb-15">
              <img className="heading-left-image" src={steps2_img} alt="steps" />
              <span className="ml-10 mr-10 sub-title">Team Members</span>
              <img className="heading-right-image" src={steps2_img} alt="steps" />
            </div>
            <h2 className="title">Meet The Crew</h2>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="team-item text-center active-shape">
                <img src={team_img} alt="member1" />
                <h4 className="team-title mb-8"><a href="teamdetails.html">Berneice Tran</a></h4>
                <div className="dsc">Director</div>
                <ul className="team-icon-list">
                  <li><a href="#"><i className="icon-linkedin"></i></a></li>
                  <li><a href="#"><i className="icon-twitter"></i></a></li>
                  <li><a href="#"><i className="icon-facebook"></i></a></li>
                </ul>
                <span className="border-shadow shadow-1"></span>
                <span className="border-shadow shadow-2"></span>
                <span className="border-shadow shadow-3"></span>
                <span className="border-shadow shadow-4"></span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-item text-center active-shape">
                <img src={team2_img} alt="member2" />
                <h4 className="team-title mb-8"><a href="teamdetails.html">Genaro Nadel</a></h4>
                <div className="dsc">VP of Engineering</div>
                <ul className="team-icon-list">
                  <li><a href="#"><i className="icon-linkedin"></i></a></li>
                  <li><a href="#"><i className="icon-twitter"></i></a></li>
                </ul>
                <span className="border-shadow shadow-1"></span>
                <span className="border-shadow shadow-2"></span>
                <span className="border-shadow shadow-3"></span>
                <span className="border-shadow shadow-4"></span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-item text-center active-shape">
                <img src={team3_img} alt="member3" />
                <h4 className="team-title mb-8"><a href="teamdetails.html">Lynnette Wilkes</a></h4>
                <div className="dsc">Fullstack Developer</div>
                <ul className="team-icon-list">
                  <li><a href="#"><i className="icon-linkedin"></i></a></li>
                  <li><a href="#"><i className="icon-twitter"></i></a></li>
                </ul>
                <span className="border-shadow shadow-1"></span>
                <span className="border-shadow shadow-2"></span>
                <span className="border-shadow shadow-3"></span>
                <span className="border-shadow shadow-4"></span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-item text-center active-shape">
                <img src={team4_img} alt="member4" />
                <h4 className="team-title mb-8"><a href="teamdetails.html">Claudia Hicks</a></h4>
                <div className="dsc">Sr. Developer</div>
                <ul className="team-icon-list">
                  <li><a href="#"><i className="icon-linkedin"></i></a></li>
                </ul>
                <span className="border-shadow shadow-1"></span>
                <span className="border-shadow shadow-2"></span>
                <span className="border-shadow shadow-3"></span>
                <span className="border-shadow shadow-4"></span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-item text-center active-shape">
                <img src={team5_img} alt="member5" />
                <h4 className="team-title mb-8"><a href="teamdetails.html">Louis Baker</a></h4>
                <div className="dsc">Software Engineer</div>
                <ul className="team-icon-list">
                  <li><a href="#"><i className="icon-linkedin"></i></a></li>
                  <li><a href="#"><i className="icon-twitter"></i></a></li>
                </ul>
                <span className="border-shadow shadow-1"></span>
                <span className="border-shadow shadow-2"></span>
                <span className="border-shadow shadow-3"></span>
                <span className="border-shadow shadow-4"></span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-item text-center active-shape">
                <img src={team6_img} alt="team6" />
                <h4 className="team-title mb-8"><a href="teamdetails.html">Nathan Bean</a></h4>
                <div className="dsc">Sr. UI Designer</div>
                <ul className="team-icon-list">
                  <li><a href="#"><i className="icon-linkedin"></i></a></li>
                </ul>
                <span className="border-shadow shadow-1"></span>
                <span className="border-shadow shadow-2"></span>
                <span className="border-shadow shadow-3"></span>
                <span className="border-shadow shadow-4"></span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-item text-center active-shape">
                <img src={team7_img} alt="team7" />
                <h4 className="team-title mb-8"><a href="teamdetails.html">R. Hawley</a></h4>
                <div className="dsc">Jr. UI/UX Designer</div>
                <ul className="team-icon-list">
                  <li><a href="#"><i className="icon-linkedin"></i></a></li>
                  <li><a href="#"><i className="icon-twitter"></i></a></li>
                  <li><a href="#"><i className="icon-facebook"></i></a></li>
                </ul>
                <span className="border-shadow shadow-1"></span>
                <span className="border-shadow shadow-2"></span>
                <span className="border-shadow shadow-3"></span>
                <span className="border-shadow shadow-4"></span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-item text-center active-shape">
                <img src={team8_img} alt="team8" />
                <h4 className="team-title mb-8"><a href="teamdetails.html">Pedro Carrera</a></h4>
                <div className="dsc">Graphic Designer</div>
                <ul className="team-icon-list">
                  <li><a href="#"><i className="icon-linkedin"></i></a></li>
                  <li><a href="#"><i className="icon-twitter"></i></a></li>
                </ul>
                <span className="border-shadow shadow-1"></span>
                <span className="border-shadow shadow-2"></span>
                <span className="border-shadow shadow-3"></span>
                <span className="border-shadow shadow-4"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default IndexPage
