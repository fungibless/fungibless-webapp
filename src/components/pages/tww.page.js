import * as React from "react"
import PageSection from "../../sections/page-secion";
import BreadcrumbPageSection from '../../sections/breadcrumb/breadcrumb.section'
import { useSelector } from 'react-redux'
import numeral from 'numeral'

const TypicalWageWorkersPage = () => {

    const ethBalance = useSelector((state) => state.wallet.balance.eth)
    const maximumSupply = useSelector((state) => state.contract_nft.tww.maximumSupply)

    return (
        <React.Fragment>
            <BreadcrumbPageSection pageTitle="Typical Wage Workers" />
            <PageSection className="participat-information project-details-conent gamfi-about-secion pb-80 md-pb-50">
                <div className="container">
                    <div className="row pt-70">
                        <div className="col-lg-12 pr-25 md-pr-15">
                            <div className="project-item">
                                <div className="project-info border-bottom-2 text-center">
                                    <h4 className="mb-15">BUY TWW (Typical Wage Workers)</h4>
                                    <h3 className="mb-15">1 <span className="buse">TWW</span> = 1 <span className="buse">MATIC</span></h3>
                                    {/* <span>Total Stake</span> */}
                                </div>
                                <div className="project-contentm mt-4">
                                    <div className="StakeTabcontent">
                                        <div className="project-media mb-40">
                                            <ul className="project-listing">
                                                <li>Final Maximum Supply: <strong>{numeral(maximumSupply).format('#,#')} TWW</strong> <span>Round </span></li>
                                                <li>Current Maximum Supply: <strong>100 TWW</strong> <a href="#!"><span className="big-text">#1</span></a></li>
                                                <li>Total supply: <strong>0 TWW</strong> <span>Status</span></li>
                                                <li>Left <strong>0 TWW</strong> on this round. <a href="#!"><span className="big-text">Minting</span></a></li>
                                                <li>Price: <strong>1 MATIC</strong></li>
                                                <li>Progress (20 sold out of 100)<div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{width:'25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">20 / 100</div>
                                                </div></li>
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