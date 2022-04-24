/* eslint-disable no-console */
import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import numeral from 'numeral';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import { ethers } from 'ethers';
import PageSection from '../components/PageSection';
import BreadcrumbPageSection from '../sections/BreadcrumbPageSection';
import { walletModule } from '../sections/WalletSection';

import WalletModule from '../module/wallet-module';
import { setInteracting } from '../features/wallet-slice';

import VerticallyCenteredModal from '../components/vertically-centered-modal';

const selectStyles = {
  border: '1px solid #313245',
  background: 'transparent',
  padding: '16px 20px',
  color: 'rgba(255, 255, 255, 0.7)',
  width: '60%',
};

const strongText = {
  color: '#a3ff12',
  marginLeft: '5px',
};

const rarityData = {
  common: { grade: 'Common', count: 1327, level: 1 },
  uncommon: { grade: 'Uncommon', count: 1970, level: 2 },
  rare: { grade: 'Rare', count: 2566, level: 3 },
  unique: { grade: 'Unique', count: 1988, level: 4 },
  epic: { grade: 'Epic', count: 1312, level: 5 },
  legendary: { grade: 'Legendary', count: 695, level: 6 },
  ancient: { grade: 'Ancient', count: 142, level: 7 },
};

const roundMap = {
  // eslint-disable-next-line max-len
  100: 1, 200: 2, 300: 3, 400: 4, 500: 5, 1000: 6, 1500: 7, 2000: 8, 2500: 9, 3000: 10, 3500: 11, 4000: 12, 5000: 13, 6000: 14, 7000: 15, 8000: 16, 9000: 17, 10000: 18,
};

const costumeData = {
  artist: { count: 537, name: 'Artist' },
  astronauts: { count: 178, name: 'Astronauts' },
  athelete: { count: 492, name: 'Athlete' },
  ballerina: { count: 488, name: 'Ballerina' },
  boxer: { count: 538, name: 'Boxer' },
  chef: { count: 511, name: 'Chef' },
  cop: { count: 578, name: 'Cop' },
  crew: { count: 500, name: 'Crew' },
  doctor: { count: 530, name: 'Doctor' },
  farmer: { count: 537, name: 'Farmer' },
  fighter: { count: 177, name: 'Fighter' },
  firefighter: { count: 522, name: 'Firefighter' },
  jobless: { count: 523, name: 'Jobless' },
  king: { count: 50, name: 'King' },
  magician: { count: 508, name: 'Magician' },
  ninja: { count: 189, name: 'Ninja' },
  plumber: { count: 525, name: 'Plumber' },
  priest: { count: 524, name: 'Priest' },
  prisoner: { count: 542, name: 'Prisoner' },
  programmer: { count: 226, name: 'Programmer' },
  ranger: { count: 168, name: 'Ranger' },
  scientist: { count: 522, name: 'Scientist' },
  teacher: { count: 528, name: 'Teacher' },
  wizard: { count: 107, name: 'Wizard' },
};

// eslint-disable-next-line max-len
function TwwInformation({ contractLoadFinished, maxSupply, symbol, round, totalSupply, step, price, progress, ethBalance, mintAmount, maxMintAmount, isMinting, leftQty, setMintAmount, mint, walletConnected }) {
  TwwInformation.propTypes = {
    contractLoadFinished: PropTypes.bool.isRequired,
    maxSupply: PropTypes.number.isRequired,
    symbol: PropTypes.string.isRequired,
    round: PropTypes.number.isRequired,
    totalSupply: PropTypes.number.isRequired,
    step: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    ethBalance: PropTypes.string.isRequired,
    mintAmount: PropTypes.number.isRequired,
    maxMintAmount: PropTypes.number.isRequired,
    isMinting: PropTypes.bool.isRequired,
    leftQty: PropTypes.number.isRequired,
    setMintAmount: PropTypes.func.isRequired,
    mint: PropTypes.func.isRequired,
    walletConnected: PropTypes.bool.isRequired,
  };

  const disableMinting = !walletConnected || !contractLoadFinished
    || (totalSupply >= maxSupply) || isMinting;

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {contractLoadFinished
        && (
          <>
            <div className="project-media mb-40">
              <ul className="project-listing">
                <li>
                  Total Supply
                  <strong style={strongText}>
                    {numeral(maxSupply).format('#,#')}
                    {' '}
                    {symbol}
                  </strong>
                  {' '}
                  <span className="big-text">{round > 0 ? `Round #${round}` : '-'}</span>
                </li>
                <li>
                  Total Minted
                  <strong style={strongText}>
                    {numeral(totalSupply).format('#,#')}
                    {' '}
                    {symbol}
                  </strong>
                </li>
                <li>
                  Left
                  <strong style={strongText}>
                    {numeral(leftQty).format('#,#')}
                    {' '}
                    {symbol}
                  </strong>
                  {' '}
                  on this round.
                  <span className="big-text">{step}</span>
                </li>
                <li>
                  Price
                  <strong style={strongText}>
                    {ethers.utils.formatEther(price, 'ether')}
                    {' '}
                    MATIC
                  </strong>
                </li>
                <li>
                  Progress (sold
                  <strong style={strongText}>
                    {numeral(totalSupply).format('#,#')}
                    {' '}
                    out of
                    {' '}
                    {numeral(maxSupply).format('#,#')}
                  </strong>
                  )
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                      {numeral(progress).format('#,#')}
                      %
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="project-form-list">
              <h5 className="mb-18">
                Balance:
                {numeral(ethBalance).format('0.000')}
                {' '}
                MATIC
              </h5>
              <div className="input-group balance-form-area mb-27 ">
                <select
                  value={mintAmount}
                  style={selectStyles}
                  onChange={(e) => { setMintAmount(e.target.value); }}
                >
                  {[...Array(maxMintAmount)].map((x, i) => (
                    <option value={i + 1} key={`${(i + 1)} TWW`} style={{ color: 'black' }}>
                      {i + 1}
                      {' '}
                      TWW
                    </option>
                  ))}
                </select>
                <div className="white-shape-small approve">
                  <button
                    type="button"
                    className="btn"
                    disabled={disableMinting}
                    onClick={mint}
                    style={{
                      background: '#6D4AFE', color: 'white', padding: '16px 20px', width: '170px', fontWeight: 'bolder', fontFamily: '"Russo One", sans-serif',
                    }}
                  >
                    {isMinting && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
                    &nbsp;MINT
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
    </>
  );
}

function TwwInformationError({ children }) {
  TwwInformationError.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return (
    <div className="project-media mb-40 text-center">
      {children}
    </div>
  );
}

function TypicalWageWorkersPage() {
  const dispatch = useDispatch();

  const CONTRACT_TWW_ADDRESS = process.env.GATSBY_CONTRACT_TWW_ADDRESS;
  const CONTRACT_TWW_ABI_LOCATION = process.env.GATSBY_CONTRACT_TWW_ABI_LOCATION;
  const CONTRACT_TWW_SYMBOL = process.env.GATSBY_CONTRACT_TWW_SYMBOL;
  const POLYGON_SCAN_TOKEN = `${process.env.GATSBY_WALLET_NETWORK_BLOCK_EXPLORER_URLS}/address/${process.env.GATSBY_CONTRACT_TWW_ADDRESS}`;

  const ethBalance = useSelector((state) => state.wallet.balance.eth);
  const walletInstalled = useSelector((state) => state.wallet.installed);
  const walletConnected = useSelector((state) => state.wallet.connected);
  const rightNetwork = useSelector((state) => state.wallet.rightNetwork);
  const isMinting = useSelector((state) => state.wallet.interacting);

  const [erc721, setERC721] = React.useState(null);
  const [maxSupply, setMaxSupply] = React.useState(0);
  const [totalSupply, setTotalSupply] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [isPaused, setPaused] = React.useState(false);
  const [round, setRound] = React.useState(0);
  const [maxMintAmount, setMaxMintAmount] = React.useState(0);
  const [mintAmount, setMintAmount] = React.useState(1);
  const [contractLoadFinished, setContractLoadFinished] = React.useState(false);

  const [showModal, setShowModal] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState('-');

  const roundData = {
    100: {
      no: 1, saleAmount: 100, maxSupply: 100, price: '1 MATIC',
    },
    200: {
      no: 2, saleAmount: 100, maxSupply: 200, price: 'Based on voting',
    },
    300: {
      no: 3, saleAmount: 100, maxSupply: 300, price: 'Based on voting',
    },
    400: {
      no: 4, saleAmount: 100, maxSupply: 400, price: 'Based on voting',
    },
    500: {
      no: 5, saleAmount: 100, maxSupply: 500, price: 'Based on voting',
    },
    1000: {
      no: 6, saleAmount: 500, maxSupply: 1000, price: 'Based on voting',
    },
    1500: {
      no: 7, saleAmount: 500, maxSupply: 1500, price: 'Based on voting',
    },
    2000: {
      no: 8, saleAmount: 500, maxSupply: 2000, price: 'Based on voting',
    },
    2500: {
      no: 9, saleAmount: 500, maxSupply: 2500, price: 'Based on voting',
    },
    3000: {
      no: 10, saleAmount: 500, maxSupply: 3000, price: 'Based on voting',
    },
    3500: {
      no: 11, saleAmount: 500, maxSupply: 3500, price: 'Based on voting',
    },
    4000: {
      no: 12, saleAmount: 500, maxSupply: 4000, price: 'Based on voting',
    },
    5000: {
      no: 13, saleAmount: 1000, maxSupply: 5000, price: 'Based on voting',
    },
    6000: {
      no: 14, saleAmount: 1000, maxSupply: 6000, price: 'Based on voting',
    },
    7000: {
      no: 15, saleAmount: 1000, maxSupply: 7000, price: 'Based on voting',
    },
    8000: {
      no: 16, saleAmount: 1000, maxSupply: 8000, price: 'Based on voting',
    },
    9000: {
      no: 17, saleAmount: 1000, maxSupply: 9000, price: 'Based on voting',
    },
    10000: {
      no: 18, saleAmount: 1000, maxSupply: 10000, price: 'Based on voting',
    },
  };

  const progress = React.useMemo(() => (totalSupply / maxSupply) * 100, [totalSupply, maxSupply]);

  const leftQty = React.useMemo(() => maxSupply - totalSupply, [maxSupply, totalSupply]);

  const status = React.useMemo(() => {
    if (isPaused) {
      return 'Paused';
    }
    if (totalSupply < maxSupply) {
      return 'On Sale';
    }
    return 'Round End';
  }, [isPaused, totalSupply, maxSupply]);

  const loadContractDetail = React.useCallback(async (contract) => {
    try {
      const cost = await contract.cost();

      const maximumSupply = (await contract.maxSupply()).toNumber();
      const totalSold = (await contract.totalSupply()).toNumber();
      const paused = (await contract.paused());
      const roundNumber = roundMap[maximumSupply];
      const maxMintAmountForMint = (await contract.maxMintAmount()).toNumber();

      console.log('cost:', cost);
      console.log('maximumSupply:', maximumSupply);
      console.log('totalSupply:', totalSold);
      console.log('paused:', paused);
      console.log('max mint amount:', maxMintAmountForMint);

      setPrice(cost);
      setMaxSupply(maximumSupply);
      setTotalSupply(totalSold);
      setPaused(paused);
      setRound(roundNumber);
      setMaxMintAmount(maxMintAmountForMint);
    } catch (err) {
      console.error(err);
    } finally {
      setContractLoadFinished(true);
    }
  }, []);

  const loadContract = React.useCallback(async () => {
    const abiResponse = await fetch(CONTRACT_TWW_ABI_LOCATION, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const json = await abiResponse.json();

    const contract = new ethers.Contract(CONTRACT_TWW_ADDRESS, json, walletModule.ethers);
    setERC721(contract);

    await loadContractDetail(contract);
  }, [setERC721, loadContractDetail]);

  React.useEffect(() => {
    loadContract();
  }, [loadContract]);

  const mint = async () => {
    const signer = walletModule.ethers.getSigner();
    const twwWithSigner = erc721.connect(signer);

    const payableAmount = price.mul(mintAmount).toString();
    console.log('payable amount:', payableAmount);

    try {
      dispatch(setInteracting(true));
      const gasPrice = await (await walletModule.ethers.getGasPrice()).toString();
      console.log('Gas Price:', gasPrice, ' Mint Amount:', mintAmount, ' Payable Amount:', payableAmount);
      const tx = await twwWithSigner.mint(mintAmount, { gasPrice, value: payableAmount });
      console.log('receipt', tx);
      const result = await tx.wait();
      console.log('Transaction Completed', result);

      console.log(`${result.from} to ${result.to} with status: ${result.status}`);

      if (result.status === 1) {
        const transfers = result.events.filter((evt) => evt.event === 'Transfer');
        const tokenIds = [];
        Object.keys(transfers).forEach((key) => {
          tokenIds.push(parseInt(transfers[key].args.tokenId.toString(), 10));
        });

        console.log(tokenIds);

        setModalMessage(`Minting was successful. Congratulations. Token IDs: ${tokenIds.join(',')} `);
        setShowModal(true);
        dispatch(setInteracting(false));
        await loadContractDetail(erc721);
        await walletModule.loadBalance();
      } else {
        setModalMessage(`Transaction ${result.tansactionHash} Failed.`);
        setShowModal(true);
        dispatch(setInteracting(false));
        console.warn('Transaction Failed.');
      }
    } catch (err) {
      setModalMessage(`[${err.code}] ${err.message}`);
      setShowModal(true);
      dispatch(setInteracting(false));
      console.log(err);
    }
  };

  return (
    <>
      <BreadcrumbPageSection pageTitle="Typical Wage Workers" />

      <PageSection className="project-details-conent pb-80 md-pb-50">
        <div className="row pt-70">
          <div className="col-lg-12 pr-25 md-pr-15">
            <div className="project-item">

              <div className="project-info border-bottom-2 text-center">
                <h3 className="mb-15">
                  BUY
                  {CONTRACT_TWW_SYMBOL}
                  {' '}
                  (Typical Wage Workers)
                </h3>
                <h4 className="mb-15">
                  1
                  <span className="buse">{` ${CONTRACT_TWW_SYMBOL}`}</span>
                  {' '}
                  =&nbsp;
                  {ethers.utils.formatEther(price, 'ether')}
                  {' '}
                  <span className="buse">MATIC</span>
                </h4>
                {/* <span>Total Stake</span> */}
              </div>
              {
                walletInstalled && rightNetwork && !contractLoadFinished
                && (
                  <div className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only" />
                    </div>
                  </div>
                )
              }

              <div className="project-content mt-4">
                {
                  !walletInstalled
                  && <TwwInformationError>Please install Metamask</TwwInformationError>
                }
                {
                  walletInstalled && rightNetwork && (
                    <TwwInformation
                      contractLoadFinished={contractLoadFinished}
                      maxSupply={maxSupply}
                      symbol={CONTRACT_TWW_SYMBOL}
                      round={round}
                      totalSupply={totalSupply}
                      leftQty={leftQty}
                      step={status}
                      price={price.toString()}
                      progress={progress}
                      ethBalance={ethBalance}
                      mintAmount={mintAmount}
                      maxMintAmount={maxMintAmount}
                      isMinting={isMinting}
                      setMintAmount={setMintAmount}
                      mint={mint}
                      walletConnected={walletConnected}
                    />
                  )
                }
                {
                  !walletConnected
                  && <TwwInformationError>Please connect to your wallet.</TwwInformationError>
                }
                {
                  !rightNetwork && (
                    <TwwInformationError>
                      Set your network to
                      {process.env.GATSBY_WALLET_NETWORK_CHAIN_NAME}
                    </TwwInformationError>
                  )
                }
              </div>
              <hr />
              <div className="project-info text-center">
                <div className="mb-15">
                  Contract Address:
                  <OutboundLink href={POLYGON_SCAN_TOKEN} target="_blank">
                    {WalletModule.shortenWalletAddress(CONTRACT_TWW_ADDRESS)}
                  </OutboundLink>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 pr-25 md-pr-15">
            <div className="project-item">
              <div className="project-info border-bottom-2 text-center">
                <h3 className="mb-15">Rarity Table</h3>
              </div>
              <div className="project-content mt-4">
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th scope="col">Level</th>
                      <th scope="col">Grade</th>
                      <th scope="col">Color</th>
                      <th scope="col">Count</th>
                      <th scope="col">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      Object.entries(rarityData).map(([key, value]) => (
                        <tr key={key}>
                          <td>{value.level}</td>
                          <td>{value.grade}</td>
                          <td><img src={`https://fungibless.s3.us-east-2.amazonaws.com/image/tww/grade/${key}.png`} width={24} height={24} alt={value.grade} /></td>
                          <td>{numeral(value.count).format('#,#')}</td>
                          <td>{numeral(value.count / 10000).format('0.00%')}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-lg-12 pr-25 md-pr-15">
            <div className="project-item">
              <div className="project-info border-bottom-2 text-center">
                <h3 className="mb-15">Occupation Table</h3>
              </div>
              <div className="project-content mt-4">
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th scope="col">Job</th>
                      <th scope="col">Count</th>
                      <th scope="col">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      Object.entries(costumeData).map(([key, value]) => (
                        <tr key={key}>
                          <td>
                            {value.name}
                          </td>
                          <td>{numeral(value.count).format('#,#')}</td>
                          <td>{numeral(value.count / 10000).format('0.00%')}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-lg-12 pr-25 md-pr-15">
            <div className="project-item">
              <div className="project-info border-bottom-2 text-center">
                <h3 className="mb-15">TWW Token Sale Plan</h3>
              </div>
              <div className="project-content mt-4">
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th scope="col">Round</th>
                      <th scope="col">Sales Volume</th>
                      <th scope="col">Total Supply</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      Object.entries(roundData).map(([key, value]) => (
                        <tr key={key}>
                          <td>
                            #
                            {value.no}
                          </td>
                          <td>{numeral(value.saleAmount).format('#,#')}</td>
                          <td>{numeral(value.maxSupply).format('#,#')}</td>
                          <td>{value.price}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </PageSection>
      <VerticallyCenteredModal show={showModal} onHide={() => setShowModal(false)}>
        {modalMessage}
      </VerticallyCenteredModal>

    </>
  );
}

export default TypicalWageWorkersPage;
