import * as React from 'react';
import BreadcrumbPageSection from '../sections/BreadcrumbPageSection';
import imgCheckIcon from '../assets/images/kycimg/RMcheckicon.svg';
import imgMuniesIcon from '../assets/images/kycimg/munies.svg';

function RoadmapPage() {
  return (
    <>
      <BreadcrumbPageSection pageTitle="Roadmap" />
      <div className="gamfiRoadMap">
        <div className="RoadMapSect">
          <div className="container RoadMapContainer">
            <div className="Roadmap2021">
              <div className="roadmap2021Divider">
                <span>2022</span>
              </div>
              <div className="row m-0">
                <div className="col-md-6">
                  <div className="RodmapConetent RodmapLeftConetent">
                    <div className="RodmapConetentbox RodmapConetentbox1">
                      <h3>Q1 2022</h3>
                      <ul>
                        <li>
                          <span><img src={imgCheckIcon} alt="icon" className="img-fluid" /></span>
                          Fungibless Initiation
                        </li>
                        <li>
                          <span><img src={imgCheckIcon} alt="icon" className="img-fluid" /></span>
                          Launch Website
                        </li>
                        <li>
                          <span><img src={imgCheckIcon} alt="icon" className="img-fluid" /></span>
                          Create TWW Arts
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="RodmapConetent RodmapRightConetent">
                    <div className="RodmapConetentbox RodmapConetentbox2">
                      <h3>Q2 2022</h3>
                      <ul>
                        <li>
                          <span><img src={imgCheckIcon} alt="icon" className="img-fluid" /></span>
                          Launch NFT: TWW
                        </li>
                        <li>
                          <span><img src={imgCheckIcon} alt="icon" className="img-fluid" /></span>
                          TWW Minting Rounds
                        </li>
                        <li>
                          <span><img src={imgMuniesIcon} alt="icon" className="img-fluid" /></span>
                          Launch of the FUNGI Token
                        </li>
                        <li>
                          <span><img src={imgMuniesIcon} alt="icon" className="img-fluid" /></span>
                          Launch Staking Feature
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="RodmapConetent RodmapLeftConetent">
                    <div className="RodmapConetentbox RodmapConetentbox3">
                      <h3>Q3 2022</h3>
                      <ul>
                        <li>
                          <span><img src={imgMuniesIcon} alt="icon" className="img-fluid" /></span>
                          IDO(Initial Dex Offering)
                        </li>
                        <li>
                          <span><img src={imgMuniesIcon} alt="icon" className="img-fluid" /></span>
                          Full-scale platform launch
                        </li>
                        <li>
                          <span><img src={imgMuniesIcon} alt="icon" className="img-fluid" /></span>
                          Launch new NFT: TBD
                        </li>
                        <li>
                          <span><img src={imgMuniesIcon} alt="icon" className="img-fluid" /></span>
                          Imporve Staking Features
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="RodmapConetent RodmapRightConetent">
                    <div className="RodmapConetentbox RodmapConetentbox2">
                      <h3>Q4 2022</h3>
                      <ul>
                        <li>
                          <span><img src={imgMuniesIcon} alt="icon" className="img-fluid" /></span>
                          Development of NFT Marketplace
                        </li>
                        <li>
                          <span><img src={imgMuniesIcon} alt="icon" className="img-fluid" /></span>
                          Launch new NFT: to be determined
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="Roadmap2021">
              <div className="roadmap2021Divider">
                <span>2023</span>
              </div>
              <div className="row m-0">
                <div className="col-md-6">
                  <div className="RodmapConetent RodmapLeftConetent">
                    <div className="RodmapConetentbox RodmapConetentbox3">
                      <h3>Q1 2023</h3>
                      <ul>
                        <li>
                          <span><img src={imgMuniesIcon} alt="icon" className="img-fluid" /></span>
                          IGO (Initial Game Offering)
                        </li>
                        <li>
                          <span><img src={imgMuniesIcon} alt="icon" className="img-fluid" /></span>
                          Web 3.0 game development
                        </li>
                        <li>
                          <span><img src={imgMuniesIcon} alt="icon" className="img-fluid" /></span>
                          Launch new NFT: to be determined
                        </li>
                        <li>
                          <span><img src={imgMuniesIcon} alt="icon" className="img-fluid" /></span>
                          Listing FUNGI Token on CEX (Centralized Exchange)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="RodmapConetent RodmapRightConetent">
                    <div className="RodmapConetentbox RodmapConetentbox2">
                      <h3>Q2 2023</h3>
                      <ul>
                        <li>
                          <span><img src={imgMuniesIcon} alt="icon" className="img-fluid" /></span>
                          Game launch
                        </li>
                        <li>
                          <span><img src={imgMuniesIcon} alt="icon" className="img-fluid" /></span>
                          Launch on GamFi
                        </li>
                        <li>
                          <span><img src={imgMuniesIcon} alt="icon" className="img-fluid" /></span>
                          Team expansion
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="RodmapConetent RodmapLeftConetent">
                    <div className="RodmapConetentbox RodmapConetentbox3">
                      <h3>Q3 2023</h3>
                      <ul>
                        <li>
                          <span>
                            <img src={imgMuniesIcon} alt="icon" className="img-fluid" />
                            TBD
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="RodmapConetent RodmapRightConetent">
                    <div className="RodmapConetentbox RodmapConetentbox2">
                      <h3>Q4 2023</h3>
                      <ul>
                        <li>
                          <span>
                            <img src={imgMuniesIcon} alt="icon" className="img-fluid" />
                            TBD
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoadmapPage;
