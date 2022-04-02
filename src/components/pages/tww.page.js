import * as React from "react"
import PageSection from "../../sections/page-secion";
import BreadcrumbPageSection from '../../sections/breadcrumb/breadcrumb.section'
import { useSelector } from 'react-redux'
import numeral from 'numeral'
import { ethers } from "ethers";

import * as styles from "../../styles/tww.module.css"

const TypicalWageWorkersPage = () => {

    const CONTRACT_TWW_ADDRESS = process.env.GATSBY_CONTRACT_TWW_ADDRESS
    const CONTRACT_TWW_ABI_LOCATION = process.env.GATSBY_CONTRACT_TWW_ABI_LOCATION
    const CONTRACT_TWW_SYMBOL = process.env.GATSBY_CONTRACT_TWW_SYMBOL

    const ethBalance = useSelector((state) => state.wallet.balance.eth)

    const [maxSupply, setMaxSupply] = React.useState(0);
    const [totalSupply, setTotalSupply] = React.useState(0);
    const [price, setPrice] = React.useState(0);
    const [isPaused, setPaused] = React.useState(false);
    const [round, setRound] = React.useState(0);
    const [maxMintAmount, setMaxMintAmount] = React.useState(0);

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
        return totalSupply / maxSupply;
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
                return "On Minting"
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

    const loadContract = React.useCallback(async () => {

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

        fetchABI().then(async (abi) => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const erc721 = new ethers.Contract(CONTRACT_TWW_ADDRESS, abi, provider);

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
        });
    }, [CONTRACT_TWW_ADDRESS, fetchABI])

    React.useEffect(() => {
        if (window.ethereum) {
            console.log("Loading the contract...")
            loadContract();
        }
    }, [loadContract])

    return (
        <React.Fragment>
            <BreadcrumbPageSection pageTitle="Typical Wage Workers" />
            <PageSection className="participat-information project-details-conent gamfi-about-secion pb-80 md-pb-50">
                <div className="container">
                    <div className="row pt-70">
                        <div className="col-lg-12 pr-25 md-pr-15">
                            <div className="project-item">
                                <div className="project-info border-bottom-2 text-center">
                                    <h4 className="mb-15">BUY {CONTRACT_TWW_SYMBOL} (Typical Wage Workers)</h4>
                                    <h3 className="mb-15">1 <span className="buse">{CONTRACT_TWW_SYMBOL}</span> = 1 <span className="buse">MATIC</span></h3>
                                    {/* <span>Total Stake</span> */}
                                </div>
                                <div className="project-contentm mt-4">
                                    <div className="StakeTabcontent">
                                        <div className="project-media mb-40">
                                            <ul className="project-listing">
                                                <li>Total Supply <strong className={styles.strong}>{numeral(maxSupply).format('#,#')} {CONTRACT_TWW_SYMBOL}</strong> <span className="big-text">{round > 0 ? 'Round #' + round : '-'}</span></li>
                                                <li>Total Minted <strong className={styles.strong}>{numeral(totalSupply).format('#,#')} {CONTRACT_TWW_SYMBOL}</strong></li>
                                                <li>Left <strong className={styles.strong}>{numeral(leftQty).format('#,#')} {CONTRACT_TWW_SYMBOL}</strong> on this round. <span className="big-text">{status}</span></li>
                                                <li>Price <strong className={styles.strong}>{ethers.utils.formatEther(price, 'ether')} MATIC</strong></li>
                                                <li>Progress (sold <strong className={styles.strong}>{numeral(totalSupply).format('#,#')} out of {numeral(maxSupply).format('#,#')}</strong>)
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{ width: progress + '%' }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">{numeral(totalSupply).format('#,#')} / {numeral(maxSupply).format('#,#')}</div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="project-form-list">
                                    <h5 className="mb-18">Balance: {numeral(ethBalance).format('0.000')} MATIC</h5>
                                    <div className="input-group balance-form-area mb-27 ">
                                        {/* <input type="text" placeholder="amount" /> */}
                                        <select className={styles.select}>
                                            {[...Array(maxMintAmount)].map((x, i) =>
                                                <option value={i + 1} key={i + 1}>{i + 1} TWW</option>
                                            )}
                                        </select>
                                        <div className="white-shape-small approve">
                                            <input type="submit" value="Mint" />
                                            <span className="hover-shape1"></span>
                                            <span className="hover-shape2"></span>
                                            <span className="hover-shape3"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 pr-25 md-pr-15">
                            <div className="project-item">
                                <div className="project-info border-bottom-2 text-center">
                                    <h4 className="mb-15">TWW Token Sale Plan</h4>
                                </div>
                                <div className="project-contentm mt-4">
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
                </div>
            </PageSection>
        </React.Fragment>
    )
};

export default TypicalWageWorkersPage