/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { ethers } from 'ethers';
import { useSelector } from 'react-redux';
import numeral from 'numeral';

import CountUp from 'react-countup';
import moment from 'moment';
import PageSection from '../components/PageSection';
import BreadcrumbPageSection from '../sections/BreadcrumbPageSection';
import rakingImg from '../assets/images/project/raking.png';
import raking2Img from '../assets/images/project/raking2.png';
import { walletModule } from '../sections/WalletSection';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return null;
  }, [delay]);
}

function StakingPage() {
  const CONTRACT_TWW_ADDRESS = process.env.GATSBY_CONTRACT_TWW_ADDRESS;
  const CONTRACT_TWW_ABI_LOCATION = process.env.GATSBY_CONTRACT_TWW_ABI_LOCATION;

  const CONTRACT_TWW_STAKING_ADDRESS = process.env.GATSBY_CONTRACT_TWW_STAKING_ADDRESS;
  const CONTRACT_TWW_STAKING_ABI_LOCATION = process.env.GATSBY_CONTRACT_TWW_STAKING_ABI_LOCATION;

  const account = useSelector((state) => state.wallet.account);
  const walletInstalled = useSelector((state) => state.wallet.installed);
  const walletConnected = useSelector((state) => state.wallet.connected);
  const rightNetwork = useSelector((state) => state.wallet.rightNetwork);

  const [twwContract, setTwwContract] = React.useState(null);
  const [fungiContract, setFungiContract] = React.useState(null);
  const [stakingContract, setStakingContract] = React.useState(null);
  const [twwContractLoadFinished, setTwwContractLoadFinished] = React.useState(false);
  const [stakingContractLoadFinished, setStakingContractLoadFinished] = React.useState(false);
  const [tokenList, setTokenList] = React.useState([]);
  const [stakedTokenList, setStakedTokenList] = React.useState([]);
  const [unclaimedRewards, setUnclaimedRewards] = React.useState(0);
  const [lastClaimableUpdate, setLastClaimableUpdate] = React.useState(0);
  const [stakedAmount, setStakedAmount] = React.useState(0);
  const [stakedEconomicPower, setStakedEconomicPower] = React.useState(0);
  const [claimableRewards, setClaimableRewards] = React.useState(ethers.BigNumber.from(0));
  const [rewardUnit, setRewardUnit] = React.useState(ethers.BigNumber.from(0));
  const [rewardBoost, setRewardBoost] = React.useState(0);
  const [inProgress, setInProgress] = React.useState(false);

  const loadStakingContractDetail = React.useCallback(async (contract) => {
    try {
      if (account == null) return;
      const userInfo = await contract.userStakeInfo(account);
      const ru = await contract.rewardUnit();
      const rb = await contract.rewardBoost();
      setRewardUnit(ru);
      setRewardBoost(rb);
      console.log('userInfo:', userInfo, ' rewardUnit:', ru, ' rewardBoost:', rb);

      setStakedAmount(userInfo.tokensStaked.toNumber());
      setStakedEconomicPower(userInfo.totalEconomicPowers.toNumber());
      setLastClaimableUpdate(userInfo.lastUpdated.toNumber());
      setUnclaimedRewards(userInfo.unclaimedRewards);
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
  }, [setTwwContract]);

  useInterval(() => {
    if (lastClaimableUpdate > 0 && stakedAmount > 0 && rewardUnit) {
      const unit = ethers.BigNumber.from(rewardUnit.toString());
      const unclaimed = ethers.BigNumber.from(unclaimedRewards.toString());
      const updatedRewards = unit.mul((moment().utc().unix() - lastClaimableUpdate) * stakedAmount * stakedEconomicPower * rewardBoost);
      const newClaimableReward = unclaimed.add(updatedRewards);

      setClaimableRewards(newClaimableReward);
    }
  }, 2000);

  const loadStakedTww = React.useCallback(async () => {
    const staked = await fetch(`${process.env.GATSBY_API_SERVER_HOST}account/${account}/tww/staked`);
    const stakedTokens = await staked.json();

    const tokens = [];
    if (stakedTokens !== null) {
      for (const r of stakedTokens) {
        tokens.push(
          {
            tokenId: r.TOKEN_ID,
            name: r.NAME,
            job: r.COSTUME,
            grade: r.GRADE,
            ep: r.EP,
            image: r.IMAGE,
          },
        );
      }
    }
    setStakedTokenList(tokens);
  });

  const loadOwnedTww = React.useCallback(async () => {
    const owned = await fetch(`${process.env.GATSBY_API_SERVER_HOST}account/${account}/tww/owned`);
    const ownedTokenList = await owned.json();
    console.log(ownedTokenList);

    const tokens = [];
    if (ownedTokenList !== null) {
      for (const r of ownedTokenList) {
        tokens.push(
          {
            tokenId: r.TOKEN_ID,
            name: r.NAME,
            job: r.COSTUME,
            grade: r.GRADE,
            ep: r.EP,
            image: r.IMAGE,
          },
        );
      }
    }

    setTwwContractLoadFinished(true);
    setTokenList(tokens);
  });

  React.useEffect(() => {
    loadStakingContract();
    loadTWWContract();
    loadOwnedTww();
    loadStakedTww();
  }, [loadStakingContract, loadTWWContract]);

  async function stake(tokenId) {
    setInProgress(true);
    try {
      const signer = walletModule.ethers.getSigner();
      const approvedAll = await twwContract.isApprovedForAll(account, CONTRACT_TWW_STAKING_ADDRESS);
      console.log(approvedAll);
      if (!approvedAll) {
        const twwWithSigner = await twwContract.connect(signer);
        const txApproveForAll = await twwWithSigner.setApprovalForAll(CONTRACT_TWW_STAKING_ADDRESS, true);
        const resultApproveForAll = await txApproveForAll.wait();
        console.log(resultApproveForAll);
      }

      const stakingWithSigner = await stakingContract.connect(signer);
      const tx = await stakingWithSigner.stake(tokenId);
      const stakingResult = await tx.wait();
      console.log(stakingResult);
      await loadStakingContract();
      // await loadTWWContract();
      await loadStakedTww();
      await loadOwnedTww();
    } catch (err) {
      console.error(err);
    } finally {
      setInProgress(false);
    }
  }

  async function unstake(tokenId) {
    setInProgress(true);
    try {
      const signer = walletModule.ethers.getSigner();
      const stakingWithSigner = await stakingContract.connect(signer);
      const tx = await stakingWithSigner.withdraw([tokenId]);
      const stakingResult = await tx.wait();
      console.log(stakingResult);
      await loadStakingContract();
      // await loadTWWContract();
      await loadStakedTww();
      await loadOwnedTww();
    } catch (err) {
      console.error(err);
    } finally {
      setInProgress(false);
    }
  }

  async function claim() {
    setInProgress(true);
    try {
      const signer = walletModule.ethers.getSigner();
      const stakingWithSigner = await stakingContract.connect(signer);
      const tx = await stakingWithSigner.claimRewards();
      const claimResult = await tx.wait();
      console.log(claimResult);
      await loadStakingContract();
      // await loadTWWContract();
    } catch (err) {
      console.error(err);
    } finally {
      setInProgress(false);
    }
  }

  return (
    <>
      <BreadcrumbPageSection pageTitle="Staking" />
      <PageSection className="project-details-conent gamfi-about-secion">
        {
          !walletInstalled
          && <div className="row"><div className="col-lg-12 col-md-12"><h4>Please install Metamask.</h4></div></div>
        }
        {
          !walletConnected && (
            <div className="row"><div className="col-lg-12 col-md-12"><h4>Please connect to your wallet.</h4></div></div>
          )
        }
        {
          !rightNetwork && (
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <h4>
                  Set your network to&nbsp;
                  {process.env.GATSBY_WALLET_NETWORK_CHAIN_NAME}
                </h4>
              </div>
            </div>
          )
        }
        {
          walletConnected && rightNetwork && (
            <>
              <div className="row">
                <div className="col-lg-3 col-md-5">
                  <div className="project-item project-value-inner">
                    <div className="project-value">
                      <h4 className="mb-15 counter-number">
                        <CountUp end={stakedAmount} preserveValue decimal="," />
                        <span style={{ float: 'right' }}>TWW</span>
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
                        <CountUp end={stakedEconomicPower} preserveValue decimal="," />
                        <span style={{ float: 'right' }}>EP</span>
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
                        <CountUp
                          end={parseFloat(ethers.utils.formatEther(claimableRewards.toString()))}
                          preserveValue
                          decimals={18}
                        />
                        <span style={{ float: 'right' }}>FUNGI</span>
                      </h4>
                      <span>Your Earned</span>
                    </div>
                    <div className="project-value-image">
                      <button
                        className="btn"
                        type="button"
                        style={{
                          width: '100%', background: '#6D4AFE', color: 'white', fontFamily: '"Russo One", sans-serif',
                        }}
                        disabled={claimableRewards.lte(1000) || inProgress}
                        onClick={
                          () => {
                            claim();
                          }
                        }
                      >
                        CLAIM
                        {
                          inProgress && (
                            <div className="spinner-border" role="status" style={{ width: '1rem', height: '1rem' }}>
                              <span className="sr-only" />
                            </div>
                          )
                        }
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col"><h4>MY STAKED NFT LIST</h4></div>
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">NAME</th>
                      <th scope="col">EP</th>
                      <th scope="col">IMAGE</th>
                      <th scope="col">GRADE</th>
                      <th scope="col">STAKE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {walletConnected && rightNetwork && !twwContractLoadFinished
                      && (
                        <tr>
                          <td colSpan={6}>
                            <div className="text-center">
                              <div className="spinner-border" role="status">
                                <span className="sr-only" />
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    {
                      stakedTokenList.length < 1
                      && (
                        <tr><td colSpan={6}>No Items</td></tr>
                      )
                    }
                    {
                      Object.entries(stakedTokenList).map(([key, value]) => (
                        <tr key={key}>
                          <td>{value.tokenId}</td>
                          <td>{value.name}</td>
                          <td>{value.ep}</td>
                          <td><img src={`https://fungibless.s3.us-east-2.amazonaws.com/image/tww/${value.image}.png`} width={24} height={24} alt={value.name} /></td>
                          <td>{value.grade}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => { unstake([value.tokenId]); }}
                              className="btn"
                              disabled={inProgress}
                              style={{
                                padding: '0 10px', background: '#6D4AFE', color: 'white', fontFamily: '"Russo One", sans-serif',
                              }}
                            >
                              UNSTAKE
                              {
                                inProgress && (
                                  <div className="spinner-border" role="status" style={{ width: '1rem', height: '1rem' }}>
                                    <span className="sr-only" />
                                  </div>
                                )
                              }
                            </button>

                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col"><h4>MY TWW COLLECTION</h4></div>

                <table className="table text-center">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">NAME</th>
                      <th scope="col">EP</th>
                      <th scope="col">IMAGE</th>
                      <th scope="col">GRADE</th>
                      <th scope="col">STAKE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {walletConnected && rightNetwork && !twwContractLoadFinished
                      && (
                        <tr>
                          <td colSpan={6}>
                            <div className="text-center">
                              <div className="spinner-border" role="status">
                                <span className="sr-only" />
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    {
                      tokenList.length < 1
                      && (
                        <tr><td colSpan={6}>No Items</td></tr>
                      )
                    }
                    {
                      Object.entries(tokenList).map(([key, value]) => (
                        <tr key={key}>
                          <td>{value.tokenId}</td>
                          <td>{value.name}</td>
                          <td>{value.ep}</td>
                          <td><img src={`https://fungibless.s3.us-east-2.amazonaws.com/image/tww/${value.image}.png`} width={24} height={24} alt={value.name} /></td>
                          <td>{value.grade}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => { stake([value.tokenId]); }}
                              disabled={inProgress}
                              className="btn"
                              style={{
                                padding: '0 10px', background: '#6D4AFE', color: 'white', fontFamily: '"Russo One", sans-serif',
                              }}
                            >
                              STAKE
                              {
                                inProgress && (
                                  <div className="spinner-border" role="status" style={{ width: '1rem', height: '1rem' }}>
                                    <span className="sr-only" />
                                  </div>
                                )
                              }
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </>
          )
        }

      </PageSection>
    </>
  );
}

export default StakingPage;
