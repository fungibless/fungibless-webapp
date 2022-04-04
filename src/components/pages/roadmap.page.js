import * as React from "react"
import BreadcrumbPageSection from '../../sections/breadcrumb/breadcrumb.section'
import check_icon from '../../assets/images/kycimg/RMcheckicon.svg'
import munies_icon from '../../assets/images/kycimg/munies.svg'
import * as styles from '../../styles/roadmap.module.css'

const RoadmapPage = () => {
    return (
        <React.Fragment>
            <BreadcrumbPageSection pageTitle="Roadmap" />
            <div className={styles.gamfiRoadMap}>
                <div className={styles.RoadMapSect}>
                    <div className={`container ${styles.RoadMapContainer}`}>
                        <div className={styles.roadmap}>
                            <div className={styles.divider}>
                                <span>2022</span>
                            </div>
                            <div className="row m-0">
                                <div className="col-md-6">
                                    <div className={styles.roadmapLeft}>
                                        <div className={`${styles.roadmapContentBox} ${styles.roadmapContentBox3}`}>
                                            <h3>Q1 2022</h3>
                                            <ul>
                                                <li><span><img src={check_icon} alt="icon" className="img-fluid" /></span>Launch NFT: Super Urban Cat(SUC)</li>
                                                <li><span><img src={check_icon} alt="icon" className="img-fluid" /></span>Giveaway Super Urban Cat Monthly</li>
                                                <li><span><img src={check_icon} alt="icon" className="img-fluid" /></span>Launch Website</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className={styles.roadmapRight}>
                                        <div className={`${styles.roadmapContentBox} ${styles.roadmapContentBox2}`}>
                                            <h3>Q2 2022</h3>
                                            <ul>
                                                <li><span><img src={munies_icon} alt="icon" className="img-fluid" /></span>Launch NFT: Typical Wage Workers(TWW)</li>
                                                <li><span><img src={munies_icon} alt="icon" className="img-fluid" /></span>TWW Minting Rounds</li>
                                                <li><span><img src={munies_icon} alt="icon" className="img-fluid" /></span>Launch of the POL Token</li>
                                                <li><span><img src={munies_icon} alt="icon" className="img-fluid" /></span>Launch Staking Feature</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className={styles.roadmapLeft}>
                                        <div className={`${styles.roadmapContentBox} ${styles.roadmapContentBox3}`}>
                                            <h3>Q3 2022</h3>
                                            <ul>
                                                <li><span><img src={munies_icon} alt="icon" className="img-fluid" /></span>IDO(Initial Dex Offering)</li>
                                                <li><span><img src={munies_icon} alt="icon" className="img-fluid" /></span>Full-scale platform launch</li>
                                                <li><span><img src={munies_icon} alt="icon" className="img-fluid" /></span>Launch new NFT: to be determined</li>
                                                <li><span><img src={munies_icon} alt="icon" className="img-fluid" /></span>Imporve Staking Features</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className={styles.roadmapRight}>
                                        <div className={`${styles.roadmapContentBox} ${styles.roadmapContentBox2}`}>
                                            <h3>Q4 2022</h3>
                                            <ul>
                                                <li><span><img src={munies_icon} alt="icon" className="img-fluid" /></span>Development of NFT Marketplace</li>
                                                <li><span><img src={munies_icon} alt="icon" className="img-fluid" /></span>Launch new NFT: to be determined</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.roadmap}>
                            <div className={styles.divider}>
                                <span>2023</span>
                            </div>
                            <div className="row m-0">
                                <div className="col-md-6">
                                    <div className={styles.roadmapLeft}>
                                        <div className={`${styles.roadmapContentBox} ${styles.roadmapContentBox3}`}>
                                            <h3>Q1 2023</h3>
                                            <ul>
                                                <li><span><img src={munies_icon} alt="icon" className="img-fluid" /></span>IGO (Initial Game Offering)</li>
                                                <li><span><img src={munies_icon} alt="icon" className="img-fluid" /></span>Web 3.0 game development</li>
                                                <li><span><img src={munies_icon} alt="icon" className="img-fluid" /></span>Launch new NFT: to be determined</li>
                                                <li><span><img src={munies_icon} alt="icon" className="img-fluid" /></span>Listing POL Token on CEX (Centralized Exchange)</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className={styles.roadmapRight}>
                                        <div className={`${styles.roadmapContentBox} ${styles.roadmapContentBox2}`}>
                                            <h3>Q2 2023</h3>
                                            <ul>
                                                <li><span><img src={munies_icon} alt="icon" className="img-fluid" /></span>Game launch</li>
                                                <li><span><img src={munies_icon} alt="icon" className="img-fluid" /></span>Launch on GamFi</li>
                                                <li><span><img src={munies_icon} alt="icon" className="img-fluid" /></span>Team expansion</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className={styles.roadmapLeft}>
                                        <div className={`${styles.roadmapContentBox} ${styles.roadmapContentBox3}`}>
                                            <h3>Q3 2023</h3>
                                            <ul>
                                                <li><span><img src={munies_icon} alt="icon" className="img-fluid" />TBD</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default RoadmapPage