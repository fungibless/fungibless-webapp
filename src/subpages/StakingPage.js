/* eslint-disable no-console */
import * as React from 'react';
import { ethers } from 'ethers';
import { useSelector } from 'react-redux';
import numeral from 'numeral';

import PageSection from '../components/PageSection';
import BreadcrumbPageSection from '../sections/BreadcrumbPageSection';
import rakingImg from '../assets/images/project/raking.png';
import raking2Img from '../assets/images/project/raking2.png';
import { walletModule } from '../sections/WalletSection';

function StakingPage() {
  const CONTRACT_TWW_ADDRESS = process.env.GATSBY_CONTRACT_TWW_ADDRESS;
  const CONTRACT_TWW_ABI_LOCATION = process.env.GATSBY_CONTRACT_TWW_ABI_LOCATION;

  const CONTRACT_TWW_STAKING_ADDRESS = process.env.GATSBY_CONTRACT_TWW_STAKING_ADDRESS;
  const CONTRACT_TWW_STAKING_ABI_LOCATION = process.env.GATSBY_CONTRACT_TWW_STAKING_ABI_LOCATION;

  const account = useSelector((state) => state.wallet.account);
  const [twwContract, setTwwContract] = React.useState(null);
  const [fungiContract, setFungiContract] = React.useState(null);
  const [stakingContract, setStakingContract] = React.useState(null);
  const [twwContractLoadFinished, setTwwContractLoadFinished] = React.useState(false);
  const [stakingContractLoadFinished, setStakingContractLoadFinished] = React.useState(false);
  const [tokenList, setTokenList] = React.useState([]);
  const [lastClaimableUpdate, setLastClaimableUpdate] = React.useState(0);
  const [stakedAmount, setStakedAmount] = React.useState(0);
  const [stakedEconomicPower, setStakedEconomicPower] = React.useState(0);
  const [claimableRewards, setClaimableRewards] = React.useState(0);
  const [inProgress, setInProgress] = React.useState(false);

  const loadStakingContractDetail = React.useCallback(async (contract) => {
    try {
      if (account == null) return;
      const userInfo = await contract.userStakeInfo(account);
      console.log('userInfo:', userInfo);

      setStakedAmount(userInfo._tokensStaked.toNumber());
      setStakedEconomicPower(userInfo._totalEconomicPowers.toNumber());
      setClaimableRewards(userInfo._availableRewards.toNumber());
      setLastClaimableUpdate(userInfo._lastUpdated.toNumber());

      // const cost = await contract.cost();

      // const maximumSupply = (await contract.maxSupply()).toNumber();
      // const totalSold = (await contract.totalSupply()).toNumber();
      // const paused = (await contract.paused());

      // console.log('cost:', cost);
      // console.log('maximumSupply:', maximumSupply);
      // console.log('totalSupply:', totalSold);
      // console.log('paused:', paused);
    } catch (err) {
      console.error(err);
    } finally {
      setStakingContractLoadFinished(true);
    }
  }, [account]);

  const loadStakingContract = React.useCallback(async () => {
    const abiResponse = await fetch(CONTRACT_TWW_STAKING_ABI_LOCATION, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const abi = await abiResponse.json();
    const staking = new ethers.Contract(CONTRACT_TWW_STAKING_ADDRESS, abi, walletModule.ethers);
    setStakingContract(staking);

    await loadStakingContractDetail(staking);
  }, [setStakingContract, loadStakingContractDetail]);

  const loadTWWContractDetail = React.useCallback(async (tww) => {
    try {
      if (account == null) return;
      const walletOfOwner = await tww.walletOfOwner(account);
      const tokens = [];
      if (walletOfOwner && stakingContract) {
        for (const r of walletOfOwner) {
          tokens.push(
            {
              tokenId: r.toString(),
              staked: (await stakingContract.stakerAddress(r.toString())) === account,
            },
          );
        }
      }

      setTokenList(tokens);
      console.log('walletOfOwner:', tokens);
    } catch (err) {
      console.error(err);
    } finally {
      setTwwContractLoadFinished(true);
    }
  }, [setTwwContractLoadFinished, account, setTokenList, stakingContract]);

  const loadTWWContract = React.useCallback(async () => {
    const abiResponse = await fetch(CONTRACT_TWW_ABI_LOCATION, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const abi = await abiResponse.json();
    const tww = new ethers.Contract(CONTRACT_TWW_ADDRESS, abi, walletModule.ethers);
    setTwwContract(tww);
    await loadTWWContractDetail(tww);
  }, [setTwwContract, loadTWWContractDetail]);

  React.useEffect(() => {
    loadStakingContract();
    loadTWWContract();
  }, [loadStakingContract]);

  async function stake(tokenId) {
    setInProgress(true);
    try {
      const signer = walletModule.ethers.getSigner();
      const approvedAll = await twwContract.isApprovedForAll(account, CONTRACT_TWW_STAKING_ADDRESS);
      console.log(approvedAll);
      if (!approvedAll) {
        const twwWithSigner = await twwContract.connect(signer);
        const txApproveForAll = await twwWithSigner.setApprovalForAll(CONTRACT_TWW_STAKING_ADDRESS, true);
        // TODO INDICATOR ON
        const resultApproveForAll = await txApproveForAll.wait();
        console.log(resultApproveForAll);
      }

      const stakingWithSigner = await stakingContract.connect(signer);
      const tx = await stakingWithSigner.stake([tokenId]);
      const stakingResult = await tx.wait();
      console.log(stakingResult);
      tokenList[tokenId - 1].staked = true;
    } catch (err) {
      console.error(err);
    } finally {
      setInProgress(false);
    }
  }

  async function unstake(tokenId) {

  }

  async function claim() {
    const signer = walletModule.ethers.getSigner();
    const stakingWithSigner = await stakingContract.connect(signer);
    const tx = await stakingWithSigner.claimRewards();
    const claimResult = await tx.wait();
    console.log(claimResult);
  }

  return (
    <>
      <BreadcrumbPageSection pageTitle="Staking" />
      <PageSection className="project-details-conent gamfi-about-secion">
        <div className="row">
          <div className="col-lg-3 col-md-5">
            <div className="project-item project-value-inner">
              <div className="project-value">
                <h4 className="mb-15 counter-number">
                  <span className="counter">{numeral(stakedAmount).format('#,#')}</span>
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
                  <span className="counter">{numeral(stakedEconomicPower).format('#,#')}</span>
                  {' '}
                  EP
                </h4>
                <span>Economic Powers</span>
              </div>
              <div className="project-value-image">
                <div style={{ height: '38px' }}><img src={raking2Img} alt="index" /></div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-8">
            <div className="project-item project-value-inner">
              <div className="project-value">
                <h4 className="mb-15">
                  <span className="counter counter-claim">{ethers.utils.formatEther(claimableRewards)}</span>
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
                  disabled={claimableRewards === '0.0'}
                  onClick={
                    () => {
                      claim();
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
                <th scope="col">TOKEN ID</th>
                <th scope="col">STAKE</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.entries(tokenList).map(([key, value]) => (
                  <tr key={key}>
                    <td>{value.tokenId}</td>
                    <td>
                      {value.staked
                        && (
                          <button
                            type="button"
                            className="btn"
                            onClick={() => { unstake(value.tokenId); }}
                            style={{
                              padding: '0 10px', background: '#6D4AFE', color: 'white', fontFamily: '"Russo One", sans-serif',
                            }}
                          >
                            Unstake
                          </button>
                        )}
                      {!value.staked && (
                        <button
                          type="button"
                          onClick={() => { stake(value.tokenId); }}
                          className="btn"
                          style={{
                            padding: '0 10px', background: '#6D4AFE', color: 'white', fontFamily: '"Russo One", sans-serif',
                          }}
                        >
                          Stake
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </PageSection>
    </>
  );
}

export default StakingPage;
