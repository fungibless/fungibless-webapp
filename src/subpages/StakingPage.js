import * as React from 'react';
import { ethers } from 'ethers';
import PageSection from '../components/PageSection';
import BreadcrumbPageSection from '../sections/BreadcrumbPageSection';
import rakingImg from '../assets/images/project/raking.png';
import raking2Img from '../assets/images/project/raking2.png';

function StakingPage() {
  return (
    <>
      <BreadcrumbPageSection pageTitle="Staking" />
      <PageSection className="project-details-conent gamfi-about-secion">
        <div className="row">
          <div className="col-lg-3 col-md-5">
            <div className="project-item project-value-inner">
              <div className="project-value">
                <h4 className="mb-15 counter-number">
                  <span className="counter">3</span>
                  {' '}
                  TWW
                </h4>
                <span>Staked Amount</span>
              </div>
              <div className="project-value-image">
                <div style={{ height: '38px' }}><img src={rakingImg} alt="index" /></div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-5">
            <div className="project-item project-value-inner">
              <div className="project-value">
                <h4 className="mb-15">
                  <span className="counter">3,254</span>
                  {' '}
                  EP
                </h4>
                <span>Economic Powers</span>
              </div>
              <div className="project-value-image">
                <div style={{ height: '38px' }}><img src={rakingImg} alt="index" /></div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-8">
            <div className="project-item project-value-inner">
              <div className="project-value">
                <h4 className="mb-15">
                  <span className="counter counter-claim">{ethers.utils.formatEther('7868163')}</span>
                  {' '}
                  FUNGI
                </h4>
                <span>Your Earned</span>
              </div>
              <div className="project-value-image">
                {/* <img src="assets/images/project/raking.png" alt="rank" /> */}
                <button
                  className="btn"
                  type="button"
                  style={{
                    width: '100%', background: '#6D4AFE', color: 'white', fontFamily: '"Russo One", sans-serif',
                  }}
                  onClick={
                    () => {
                      $('.counter-claim').counterUp({
                        beginAt: ethers.utils.formatEther('500000'),
                      });
                    }
                  }
                >
                  CLAIM
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <table className="table text-center">
            <thead>
              <tr>
                <th scope="col">SYMBOL</th>
                <th scope="col">NAME</th>
                <th scope="col">ID</th>
                <th scope="col">RARITY</th>
                <th scope="col">STAKE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>TWW</td>
                <td>Somebody</td>
                <td>1</td>
                <td><img src="https://fungibless.s3.us-east-2.amazonaws.com/image/tww/grade/epic.png" width={24} height={24} alt="epic" /></td>
                <td>
                  <button
                    type="button"
                    className="btn"
                    style={{
                      padding: '0 10px', background: '#6D4AFE', color: 'white', fontFamily: '"Russo One", sans-serif',
                    }}
                  >
                    APRROVE
                  </button>

                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </PageSection>
    </>
  );
}

export default StakingPage;
