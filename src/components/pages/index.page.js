import * as React from "react"
import main_section_icon from '../../assets/images/icons/main_section_icon2.png'
import steps_img from '../../assets/images/icons/steps.png'
import steps2_img from '../../assets/images/icons/steps2.png'
import tokenomics_img from '../../assets/images/project/tokenomices-image.jpg'
import team_syous from '../../assets/images/team/team-syous.png'
import veil1_png from '../../assets/images/team/veil1.png'
import veil2_png from '../../assets/images/team/veil2.png'

const IndexPage = () => {
    return (
        <>
            <section id="sc-banner" className="sc-banner banner-bg position-relative">
                <div className="container">
                    <div className="banner-content text-center">
                        <img className="banner-icon wow fadeInUp" data-wow-delay="300ms" data-wow-duration="2500ms" src={main_section_icon} alt="icon" tabIndex="-1" />
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
            </section>

            <section className="gamfi-tokenomics-section tokenomics-left-right-shape pb-115 pt-115 md-pt-75 md-pb-45">
                <div className="container">
                    <div className="sec-heading">
                        <div className="sub-inner mb-15">
                            <span className="sub-title">statistics</span>
                            <img className="heading-left-image" src={steps_img} alt="steps" />
                        </div>
                        <h2 className="title">Tokenomics</h2>
                    </div>
                    <div style={{textAlign:'center', display:'flex', verticalAlign:'middle', justifyContent:'center'}}>
                        <div style={{backgroundColor:'#28055C', width:'30%'}}>
                            {/* <div className="dsc">Team</div> */}
                            TEAM 30%
                        </div>
                        <div style={{backgroundColor:'#37008A', width:'40%'}}>
                            <div className="dsc">Community - Staking, Game</div>
                            <h5>40%</h5>
                        </div>
                        <div style={{backgroundColor:'#50288D', width:'20%'}}>
                            <div className="dsc">Future Development</div>
                            <h5>20%</h5>
                        </div>
                        <div style={{backgroundColor:'#6C44A6', width:'5%'}}>
                            <div className="dsc">Liqudity</div>
                            <h5>5%</h5>
                        </div>
                        <div style={{backgroundColor:'#7E5AB5', width:'5%'}}>
                            <div className="dsc">Bounty</div>
                            <h5>5%</h5>
                        </div>                       
                    </div>                   
                </div>
            </section>

            <section className="gamfi-team-section pt-115 pb-85 md-pt-75 md-pb-42">
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
                                <img src={team_syous} alt="member1" />
                                <h4 className="team-title mb-8"><a href="teamdetails.html">Syous</a></h4>
                                <div className="dsc">Director</div>
                                <span className="border-shadow shadow-1"></span>
                                <span className="border-shadow shadow-2"></span>
                                <span className="border-shadow shadow-3"></span>
                                <span className="border-shadow shadow-4"></span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="team-item text-center active-shape">
                                <img src={veil1_png} alt="member2" />
                                <h4 className="team-title mb-8"><a href="teamdetails.html">Vacancy</a></h4>
                                <div className="dsc">waiting to participate</div>
                                <span className="border-shadow shadow-1"></span>
                                <span className="border-shadow shadow-2"></span>
                                <span className="border-shadow shadow-3"></span>
                                <span className="border-shadow shadow-4"></span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="team-item text-center active-shape">
                                <img src={veil2_png} alt="member3" />
                                <h4 className="team-title mb-8"><a href="teamdetails.html">Vacancy</a></h4>
                                <div className="dsc">waiting to participate</div>
                                <span className="border-shadow shadow-1"></span>
                                <span className="border-shadow shadow-2"></span>
                                <span className="border-shadow shadow-3"></span>
                                <span className="border-shadow shadow-4"></span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="team-item text-center active-shape">
                                <img src={veil2_png} alt="member4" />
                                <h4 className="team-title mb-8"><a href="teamdetails.html">Vacancy</a></h4>
                                <div className="dsc">waiting to participate</div>
                                <span className="border-shadow shadow-1"></span>
                                <span className="border-shadow shadow-2"></span>
                                <span className="border-shadow shadow-3"></span>
                                <span className="border-shadow shadow-4"></span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="team-item text-center active-shape">
                                <img src={veil1_png} alt="member5" />
                                <h4 className="team-title mb-8"><a href="teamdetails.html">Vacancy</a></h4>
                                <div className="dsc">waiting to participate</div>
                                <span className="border-shadow shadow-1"></span>
                                <span className="border-shadow shadow-2"></span>
                                <span className="border-shadow shadow-3"></span>
                                <span className="border-shadow shadow-4"></span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="team-item text-center active-shape">
                                <img src={veil1_png} alt="team6" />
                                <h4 className="team-title mb-8"><a href="teamdetails.html">Vacancy</a></h4>
                                <div className="dsc">waiting to participate</div>
                                <span className="border-shadow shadow-1"></span>
                                <span className="border-shadow shadow-2"></span>
                                <span className="border-shadow shadow-3"></span>
                                <span className="border-shadow shadow-4"></span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="team-item text-center active-shape">
                                <img src={veil2_png} alt="team7" />
                                <h4 className="team-title mb-8"><a href="teamdetails.html">Vacancy</a></h4>
                                <div className="dsc">waiting to participate</div>
                                <span className="border-shadow shadow-1"></span>
                                <span className="border-shadow shadow-2"></span>
                                <span className="border-shadow shadow-3"></span>
                                <span className="border-shadow shadow-4"></span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="team-item text-center active-shape">
                                <img src={veil1_png} alt="team8" />
                                <h4 className="team-title mb-8"><a href="teamdetails.html">Vacancy</a></h4>
                                <div className="dsc">waiting to participate</div>
                                <span className="border-shadow shadow-1"></span>
                                <span className="border-shadow shadow-2"></span>
                                <span className="border-shadow shadow-3"></span>
                                <span className="border-shadow shadow-4"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};

export default IndexPage