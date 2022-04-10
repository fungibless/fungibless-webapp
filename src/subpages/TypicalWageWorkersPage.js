import * as React from "react"
import PageSection from "../components/PageSection";
import BreadcrumbPageSection from '../sections/BreadcrumbPageSection'
import { walletModule } from "../sections/WalletSection";

import VerticallyCenteredModal from '../components/vertically-centered-modal'
import { useSelector } from 'react-redux'
import numeral from 'numeral'

import { OutboundLink } from "gatsby-plugin-google-gtag";

import { ethers } from "ethers"

const selectStyles = {
    border: '1px solid #313245',
    background: 'transparent',
    padding: '16px 20px',
    color: 'rgba(255, 255, 255, 0.7)',
    width: '60%'
}

const strongText = {
    color: '#a3ff12'
}

const TypicalWageWorkersPage = () => {

    const CONTRACT_TWW_ADDRESS = process.env.GATSBY_CONTRACT_TWW_ADDRESS
    const CONTRACT_TWW_ABI_LOCATION = process.env.GATSBY_CONTRACT_TWW_ABI_LOCATION
    const CONTRACT_TWW_SYMBOL = process.env.GATSBY_CONTRACT_TWW_SYMBOL
    const POLYGON_SCAN_TOKEN = `${process.env.GATSBY_WALLET_NETWORK_BLOCK_EXPLORER_URLS}/address/${process.env.GATSBY_CONTRACT_TWW_ADDRESS}`
    // const CONTRACT_GAS_PRICE_IN_GWEI = process.env.GATSBY_CONTRACT_GAS_PRICE_IN_GWEI

    const ethBalance = useSelector((state) => state.wallet.balance.eth)
    const walletInstalled = useSelector((state) => state.wallet.installed)
    const walletConnected = useSelector((state) => state.wallet.connected)
    const rightNetwork = useSelector((state) => state.wallet.rightNetwork)

    const [abi, setABI] = React.useState(null);
    const [maxSupply, setMaxSupply] = React.useState(0);
    const [totalSupply, setTotalSupply] = React.useState(0);
    const [price, setPrice] = React.useState(0);
    const [isPaused, setPaused] = React.useState(false);
    const [round, setRound] = React.useState(0);
    const [maxMintAmount, setMaxMintAmount] = React.useState(0);
    const [mintAmount, setMintAmount] = React.useState(1);
    const [contractLoadFinished, setContractLoadFinished] = React.useState(false)
    const [isMinting, setMinting] = React.useState(false)
    const [showModal, setShowModal] = React.useState(false)
    const [modalMessage, setModalMessage] = React.useState("-")

    const roundData = {
        100: { no: 1, saleAmount: 100, maxSupply: 100, price: '1 MATIC' },
        200: { no: 2, saleAmount: 100, maxSupply: 200, price: 'Based on voting' },
        300: { no: 3, saleAmount: 100, maxSupply: 300, price: 'Based on voting' },
        400: { no: 4, saleAmount: 100, maxSupply: 400, price: 'Based on voting' },
        500: { no: 5, saleAmount: 100, maxSupply: 500, price: 'Based on voting' },
        1000: { no: 6, saleAmount: 500, maxSupply: 1000, price: 'Based on voting' },
        1500: { no: 7, saleAmount: 500, maxSupply: 1500, price: 'Based on voting' },
        2000: { no: 8, saleAmount: 500, maxSupply: 2000, price: 'Based on voting' },
        2500: { no: 9, saleAmount: 500, maxSupply: 2500, price: 'Based on voting' },
        3000: { no: 10, saleAmount: 500, maxSupply: 3000, price: 'Based on voting' },
        3500: { no: 11, saleAmount: 500, maxSupply: 3500, price: 'Based on voting' },
        4000: { no: 12, saleAmount: 500, maxSupply: 4000, price: 'Based on voting' },
        5000: { no: 13, saleAmount: 1000, maxSupply: 5000, price: 'Based on voting' },
        6000: { no: 14, saleAmount: 1000, maxSupply: 6000, price: 'Based on voting' },
        7000: { no: 15, saleAmount: 1000, maxSupply: 7000, price: 'Based on voting' },
        8000: { no: 16, saleAmount: 1000, maxSupply: 8000, price: 'Based on voting' },
        9000: { no: 17, saleAmount: 1000, maxSupply: 9000, price: 'Based on voting' },
        10000: { no: 18, saleAmount: 1000, maxSupply: 10000, price: 'Based on voting' },
    }

    const progress = React.useMemo(() => {
        console.log("progress memo");
        return totalSupply / maxSupply * 100;
    }, [totalSupply, maxSupply])

    const leftQty = React.useMemo(() => {
        console.log("leftQty memo");
        return maxSupply - totalSupply;
    }, [maxSupply, totalSupply])

    const status = React.useMemo(() => {
        console.log("status memo");
        if (isPaused) {
            return "Paused"
        } else {
            if (totalSupply < maxSupply) {
                return "On Sale"
            } else {
                return "Round End"
            }
        }
    }, [isPaused, totalSupply, maxSupply])

    const fetchABI = React.useCallback(async () => {
        const abiResponse = await fetch(CONTRACT_TWW_ABI_LOCATION, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        return abiResponse.json();
    }, [CONTRACT_TWW_ABI_LOCATION])

    const getContract = React.useCallback(async (abiData) => {

        const roundMap = {
            100: 1,
            200: 2,
            300: 3,
            400: 4,
            500: 5,
            1000: 6,
            1500: 7,
            2000: 8,
            2500: 9,
            3000: 10,
            3500: 11,
            4000: 12,
            5000: 13,
            6000: 14,
            7000: 15,
            8000: 16,
            9000: 17,
            10000: 18
        }

        console.log("getContract - abi:", abiData)
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const erc721 = new ethers.Contract(CONTRACT_TWW_ADDRESS, abiData, provider);

            const _cost = await erc721.cost()
            const _maximumSupply = (await erc721.maxSupply()).toNumber()
            const _totalSupply = (await erc721.totalSupply()).toNumber()
            const _paused = (await erc721.paused())
            const _round = roundMap[_maximumSupply];
            const _maxMintAmount = (await erc721.maxMintAmount()).toNumber();
            console.log("cost:", _cost);
            console.log("maximumSupply:", _maximumSupply)
            console.log("totalSupply:", _totalSupply)
            console.log("paused:", _paused)
            console.log("max mint amount:", _maxMintAmount)
            setPrice(_cost)
            setMaxSupply(_maximumSupply)
            setTotalSupply(_totalSupply)
            setPaused(_paused)
            setRound(_round)
            setMaxMintAmount(_maxMintAmount)
        } catch (err) {
            console.error(err)
        } finally {
            setContractLoadFinished(true)
        }
    }, [CONTRACT_TWW_ADDRESS])

    const loadContract = React.useCallback(async () => {
        fetchABI().then(async (abiObj) => {
            setABI(abiObj)
            await getContract(abiObj)
        });
    }, [fetchABI, getContract])

    React.useEffect(() => {
        if (window.ethereum) {
            console.log("Loading the contract...")
            loadContract();
        }
    }, [loadContract])


    const mint = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const erc721 = new ethers.Contract(CONTRACT_TWW_ADDRESS, abi, provider);
        const signer = provider.getSigner();
        const twwWithSigner = erc721.connect(signer);

        const payableAmount = price.mul(mintAmount).toString()
        console.log("payable amount:", payableAmount)

        twwWithSigner.on("Transfer", async (from, to, amount, event) => {
            console.log(event)
            console.log(`${from} sent ${ethers.utils.formatEther(amount)} to ${to}`);
            setModalMessage(`Minting was successful. Congratulations.`);
            setShowModal(true)
            setMinting(false);
            await getContract(abi);
            await walletModule.loadBalance();
        });

        try {
            setMinting(true);
            const gasPrice = await (await provider.getGasPrice()).toString();
            console.log("Gas Price:", gasPrice, " Mint Amount:", mintAmount, " Payable Amount:", payableAmount);
            await twwWithSigner.mint(mintAmount, { gasPrice: gasPrice, value: payableAmount })
            // await twwWithSigner.mint(mintAmount, { gasPrice: ethers.utils.parseUnits(String(CONTRACT_GAS_PRICE_IN_GWEI), 'gwei'), value: payableAmount })
        } catch (err) {
            setModalMessage(err.message);
            setShowModal(true)
            setMinting(false);
            console.log(err)
        }
    }

    const TwwInformation = () => {
        return (
            <React.Fragment>
                {contractLoadFinished &&
                    <React.Fragment>
                        <div className="project-media mb-40">
                            <ul className="project-listing">
                                <li>Total Supply <strong style={strongText}>{numeral(maxSupply).format('#,#')} {CONTRACT_TWW_SYMBOL}</strong> <span className="big-text">{round > 0 ? 'Round #' + round : '-'}</span></li>
                                <li>Total Minted <strong style={strongText}>{numeral(totalSupply).format('#,#')} {CONTRACT_TWW_SYMBOL}</strong></li>
                                <li>Left <strong style={strongText}>{numeral(leftQty).format('#,#')} {CONTRACT_TWW_SYMBOL}</strong> on this round. <span className="big-text">{status}</span></li>
                                <li>Price <strong style={strongText}>{ethers.utils.formatEther(price, 'ether')} MATIC</strong></li>
                                <li>Progress (sold <strong style={strongText}>{numeral(totalSupply).format('#,#')} out of {numeral(maxSupply).format('#,#')}</strong>)
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{ width: progress + '%' }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">{numeral(progress).format('#,#')}%</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="project-form-list">
                            <h5 className="mb-18">Balance: {numeral(ethBalance).format('0.000')} MATIC</h5>
                            <div className="input-group balance-form-area mb-27 ">
                                <select value={mintAmount} style={selectStyles} onChange={(e) => { setMintAmount(e.target.value) }}>
                                    {[...Array(maxMintAmount)].map((x, i) =>
                                        <option value={i + 1} key={i + 1} style={{ color: 'black' }}>{i + 1} TWW</option>
                                    )}
                                </select>
                                <div className="white-shape-small approve">
                                    <button type="button" className="btn" disabled={(abi == null) || (totalSupply >= maxSupply) || isMinting} onClick={mint} style={{ background: '#6D4AFE', color: 'white', padding: '16px 20px', width: '170px', fontWeight: 'bolder', fontFamily: '"Russo One", sans-serif' }}>
                                        {isMinting && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                                        &nbsp;MINT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }

    const TwwInformationError = ({ children }) => {
        return (
            <div className="project-media mb-40 text-center">
                {children}
            </div>
        )
    }

    return (
        <>
            <BreadcrumbPageSection pageTitle="Typical Wage Workers" />

            <PageSection className="project-details-conent pb-80 md-pb-50">
                <div className="row pt-70">
                    <div className="col-lg-12 pr-25 md-pr-15">
                        <div className="project-item">

                            <div className="project-info border-bottom-2 text-center">
                                <h3 className="mb-15">BUY {CONTRACT_TWW_SYMBOL} (Typical Wage Workers)</h3>
                                <h4 className="mb-15">1 <span className="buse">{CONTRACT_TWW_SYMBOL}</span> = {ethers.utils.formatEther(price, 'ether')} <span className="buse">MATIC</span></h4>
                                {/* <span>Total Stake</span> */}
                            </div>
                            {
                                !contractLoadFinished &&
                                <div className="text-center">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only"></span>
                                    </div>
                                </div>
                            }

                            <div className="project-content mt-4">
                                {
                                    !walletInstalled && <TwwInformationError>Please install Metamask</TwwInformationError>
                                }
                                {
                                    walletInstalled && walletConnected && rightNetwork && <TwwInformation />
                                }
                                {
                                    !walletConnected && <TwwInformationError>Please connect to your wallet.</TwwInformationError>
                                }
                                {
                                    !rightNetwork && <TwwInformationError>Set your network to {process.env.GATSBY_WALLET_NETWORK_CHAIN_NAME}</TwwInformationError>
                                }
                            </div>
                            <hr />
                            <div className="project-info text-center">
                                <div className="mb-15">Contract Address: <OutboundLink href={POLYGON_SCAN_TOKEN}>{CONTRACT_TWW_ADDRESS}</OutboundLink></div>
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
                                            Object.entries(roundData).map(([key, value]) => <tr key={key}>
                                                <td>#{value.no}</td>
                                                <td>{numeral(value.saleAmount).format('#,#')}</td>
                                                <td>{numeral(value.maxSupply).format('#,#')}</td>
                                                <td>{value.price}</td>
                                            </tr>)
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
    )
};

export default TypicalWageWorkersPage