import * as React from "react"
import PageSection from "../components/PageSection";
import BreadcrumbPageSection from '../sections/BreadcrumbPageSection'

const StakingPage = () => {
    return (
        <>
            <BreadcrumbPageSection pageTitle="Staking - Coming soon" />
            <PageSection className="project-details-conent pb-80 md-pb-50">
                {/* <div class="container">
                    <div class="row pt-70">
                        <div class="col-lg-6 pr-25 md-pr-15">
                            <div class="project-item">
                                <div class="project-info border-bottom-2">
                                    <h4 class="mb-15">Participat IGO Stake</h4>
                                    <h3 class="mb-15">256.50 <span class="buse">BUSD</span></h3>
                                    <span>Total Stake</span>
                                </div>                                
                                <div class="project-content">
                                    <div id="sevenDays" class="StakeTabcontent">
                                        <div class="project-media mb-40">
                                            <ul class="project-listing">
                                                <li>Lock period: <strong>7 days</strong> <span>APY Rate</span></li>
                                                <li>Re-locks on registration: <strong>Yes</strong> <a href="#!"><span class="big-text">12 %</span></a></li>
                                                <li>Early unstake fee: <strong>25%</strong><span>*APY is dynamic</span></li>
                                                <li>Status: <strong>Unlocked</strong></li>
                                            </ul>
                                        </div>
                                    </div>                                 
                                </div>
                                <div class="project-form-list">
                                    <h5 class="mb-18">Balance: 2889.00 BUSD</h5>
                                    <div class="balance-form-area mb-27">
                                        <input type="text" placeholder="00.00"/>
                                            <span class="max">MAX</span>
                                            <div class="white-shape-small approve">
                                                <input type="submit" value="Approve"/>
                                                    <span class="hover-shape1"></span>
                                                    <span class="hover-shape2"></span>
                                                    <span class="hover-shape3"></span>
                                            </div>

                                    </div>
                                    <h5 class="mb-18">Staked: 256.50 BUSD</h5>
                                    <div class="balance-form-area">
                                        <input type="text" placeholder="0.00"/>
                                            <span class="max">MAX</span>
                                            <div class="white-shape-small">
                                                <input type="submit" value="Withdraw"/>
                                                    <span class="hover-shape1"></span>
                                                    <span class="hover-shape2"></span>
                                                    <span class="hover-shape3"></span>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 pl-25 md-pl-15">
                            <div class="project-item project-value-inner d-flex justify-content-between align-items-center mb-30">
                                <div class="project-value">
                                    <h3 class="mb-15">$7,868,163.54</h3>
                                    <span>Total Value Locked</span>
                                </div>
                                <div class="project-value-image">
                                    <img class="heading-right-image" src="assets/images/project/rank.png" alt="rank" />
                                </div>
                            </div>
                            <div class="project-item project-value-inner d-flex justify-content-between align-items-center mb-30">
                                <div class="project-value">
                                    <h3 class="mb-15">158.50 %</h3>
                                    <span>Apy</span>
                                </div>
                                <div class="project-value-image">
                                    <img class="heading-right-image" src="assets/images/project/rank2.png" alt="rank" />
                                </div>
                            </div>
                            <div class="project-item project-value-inner d-flex justify-content-between align-items-center">
                                <div class="project-value">
                                    <h3 class="mb-15">5699</h3>
                                    <span>Number of Stakers</span>
                                </div>
                                <div class="project-value-image">
                                    <img class="heading-right-image" src="assets/images/project/rank3.png" alt="rank" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </PageSection>
        </>
    )
};

export default StakingPage