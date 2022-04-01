import * as React from "react"
import PageSection from "../../sections/page-secion";
import BreadcrumbPageSection from '../../sections/breadcrumb/breadcrumb.section'
import { useSelector } from 'react-redux'
import numeral from 'numeral'
import { ethers } from "ethers";

const TypicalWageWorkersPage = () => {

    const CONTRACT_TWW_ADDRESS = process.env.GATSBY_CONTRACT_TWW_ADDRESS
    const CONTRACT_TWW_ABI_LOCATION = process.env.GATSBY_CONTRACT_TWW_ABI_LOCATION
    const CONTRACT_TWW_SYMBOL = process.env.GATSBY_CONTRACT_TWW_SYMBOL

    const ethBalance = useSelector((state) => state.wallet.balance.eth)

    const [maxSupply, setMaxSupply] = React.useState(0);
    const [totalSupply, setTotalSupply] = React.useState(0);
    const [price, setPrice] = React.useState(0);
    const [isPaused, setPaused] = React.useState(false);
    
    const progress = React.useMemo(() => {
        return totalSupply / maxSupply;
    })

    const status = React.useMemo(() => {
        if (isPaused) {
            return "Paused"
        } else {
            if(totalSupply < maxSupply) {
                return "On Minting"
            } else {
                return "Round End"
            }
        }
    })

    

    React.useEffect(() => {
        async function fetchABI() {
            const abiResponse = await fetch(CONTRACT_TWW_ABI_LOCATION, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            return abiResponse.json();
        }
        if (window.ethereum) {
            console.log("Loading the contract...")

            fetchABI().then(async (abi) => {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const erc721 = new ethers.Contract(CONTRACT_TWW_ADDRESS, abi, provider);

                const cost = await erc721.cost()
                setPrice(cost)
                setMaxSupply(await erc721.maxSupply())
                setTotalSupply(await erc721.totalSupply())
                setPaused(await erc721.paused())

            });

            // const erc721_rw = new ethers.Contract(CONTRACT_TWW_ADDRESS, abi, provider.getSigner());
            // loadContractInfo();/
        }
    }, [])

    const loadContractInfo = () => {
        // console.log("LoadContractINfo", ethereum)

    }

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
                                                <li>Final Maximum Supply: <strong>{numeral(maxSupply).format('#,#')} {CONTRACT_TWW_SYMBOL}</strong> <span>Round </span></li>
                                                <li>Current Maximum Supply: <strong>{numeral(maxSupply).format('#,#')} {CONTRACT_TWW_SYMBOL}</strong> <a href="#!"><span className="big-text">#1</span></a></li>
                                                <li>Sold amount: <strong>{numeral(totalSupply).format('#,#')} {CONTRACT_TWW_SYMBOL}</strong> <span>Status</span></li>
                                                <li>Left <strong>0 {CONTRACT_TWW_SYMBOL}</strong> on this round. <a href="#!"><span className="big-text">{status}</span></a></li>
                                                <li>Price: <strong>{ethers.utils.formatEther(price, 'ether')} MATIC</strong></li>
                                                <li>Progress (sold {numeral(totalSupply).format('#,#')} out of {numeral(maxSupply).format('#,#')})
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
                                    <div className="balance-form-area mb-27">
                                        <input type="text" placeholder="amount" />
                                        <a href="#!" onClick={() => { console.log('max') }}><span className="max">MAX</span></a>
                                        <div className="white-shape-small approve">
                                            <input type="submit" value="Approve" />
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
                                            <tr><td>#1</td><td>100</td><td>100</td><td>1 MATIC</td></tr>
                                            <tr><td>#2</td><td>100</td><td>200</td><td>based on voting</td></tr>
                                            <tr><td>#3</td><td>100</td><td>300</td><td>based on voting</td></tr>
                                            <tr><td>#4</td><td>100</td><td>400</td><td>based on voting</td></tr>
                                            <tr><td>#5</td><td>100</td><td>500</td><td>based on voting</td></tr>
                                            <tr><td>#6</td><td>500</td><td>1,000</td><td>based on voting</td></tr>
                                            <tr><td>#7</td><td>500</td><td>1,500</td><td>based on voting</td></tr>
                                            <tr><td>#8</td><td>500</td><td>2,000</td><td>based on voting</td></tr>
                                            <tr><td>#9</td><td>500</td><td>2,500</td><td>based on voting</td></tr>
                                            <tr><td>#10</td><td>500</td><td>3,000</td><td>based on voting</td></tr>
                                            <tr><td>#11</td><td>500</td><td>3,500</td><td>based on voting</td></tr>
                                            <tr><td>#12</td><td>500</td><td>4,000</td><td>based on voting</td></tr>
                                            <tr><td>#13</td><td>1,000</td><td>5,000</td><td>based on voting</td></tr>
                                            <tr><td>#14</td><td>1,000</td><td>6,000</td><td>based on voting</td></tr>
                                            <tr><td>#15</td><td>1,000</td><td>7,000</td><td>based on voting</td></tr>
                                            <tr><td>#16</td><td>1,000</td><td>8,000</td><td>based on voting</td></tr>
                                            <tr><td>#17</td><td>1,000</td><td>9,000</td><td>based on voting</td></tr>
                                            <tr><td>#18</td><td>1,000</td><td>10,000</td><td>based on voting</td></tr>
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