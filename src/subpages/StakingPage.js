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

      const tokens = [];
      for (const t of userInfo.stakedTokenIds) {
        console.log(t);
        tokens.push(
          {
            tokenId: t.toNumber(),
          },
        );
      }
      setStakedTokenList(tokens);
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
      if (walletOfOwner !== null) {
        for (const r of walletOfOwner) {
          tokens.push(
            {
              tokenId: r.toString(),
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
  }, [setTwwContractLoadFinished, account, setTokenList]);

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

  useInterval(() => {
    if (lastClaimableUpdate > 0 && stakedAmount > 0 && rewardUnit) {
      const unit = ethers.BigNumber.from(rewardUnit.toString());
      const unclaimed = ethers.BigNumber.from(unclaimedRewards.toString());
      const updatedRewards = unit.mul((moment().utc().unix() - lastClaimableUpdate) * stakedAmount * stakedEconomicPower * rewardBoost);
      const newClaimableReward = unclaimed.add(updatedRewards);
      console.log(newClaimableReward.toString());
      setClaimableRewards(newClaimableReward);
    }
  }, 2000);

  React.useEffect(() => {
    loadStakingContract();
    loadTWWContract();
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
      await loadStakingContract(stakingContract);
      await loadTWWContract(twwContract);
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
      await loadStakingContract(stakingContract);
      await loadTWWContract(twwContract);
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
      await loadStakingContract(stakingContract);
      await loadTWWContract(twwContract);
    } catch (err) {
      console.error(err);
    } finally {
      setInProgress(false);
    }
  }

  // const unstakeAll = React.useCallback(async () => {
  //   const unstakingTokenList = [];
  //   stakedTokenList.forEach((row) => {
  //     unstakingTokenList.push(row.tokenId);
  //   });
  //   console.log('Token List for Unstaking:', unstakingTokenList);
  //   stake(unstakingTokenList);
  // }, [stakedTokenList]);

  // const stakeAll = React.useCallback(async () => {
  //   const stakingTokenList = [];
  //   tokenList.forEach((row) => {
  //     stakingTokenList.push(row.tokenId);
  //   });
  //   console.log('Token List for Staking:', stakingTokenList);
  //   stake(stakingTokenList);
  // }, [tokenList]);

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
                {/* <div className="col" style={{ textAlign: 'end', paddingRight: '0' }}>
                  <button
                    type="button"
                    className="btn"
                    onClick={unstakeAll}
                    disabled={stakedTokenList.length < 1}
                    style={{
                      padding: '10px 60px', background: '#6D4AFE', color: 'white', fontFamily: '"Russo One", sans-serif',
                    }}
                  >
                    Unstake All
                  </button>
                </div> */}
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th scope="col">TOKEN ID</th>
                      <th scope="col">UNSTAKE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {walletConnected && rightNetwork && !twwContractLoadFinished
                      && (
                        <tr>
                          <td colSpan={2}>
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
                        <tr><td colSpan={2}>No Items</td></tr>
                      )
                    }
                    {
                      Object.entries(stakedTokenList).map(([key, value]) => (
                        <tr key={key}>
                          <td>{value.tokenId}</td>
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
                <div className="col"><h4>MY NFT LIST</h4></div>
                {/* <div className="col" style={{ textAlign: 'end', paddingRight: '0' }}>
                  <button
                    type="button"
                    className="btn"
                    disabled={tokenList.length < 1}
                    onClick={stakeAll}
                    style={{
                      padding: '10px 60px', background: '#6D4AFE', color: 'white', fontFamily: '"Russo One", sans-serif',
                    }}
                  >
                    Stake All
                  </button>
                </div> */}

                <table className="table text-center">
                  <thead>
                    <tr>
                      <th scope="col">TOKEN ID</th>
                      <th scope="col">STAKE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {walletConnected && rightNetwork && !twwContractLoadFinished
                      && (
                        <tr>
                          <td colSpan={2}>
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
                        <tr><td colSpan={2}>No Items</td></tr>
                      )
                    }
                    {
                      Object.entries(tokenList).map(([key, value]) => (
                        <tr key={key}>
                          <td>{value.tokenId}</td>
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
