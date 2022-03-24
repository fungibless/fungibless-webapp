import * as React from "react"
import Layout from "./layout"
import icon1 from '../assets/images/icons/icon1.png'

const IndexPage = () => {
  return (
    <Layout>
      <div id="sc-banner" className="sc-banner banner-bg position-relative">
        <div className="container">
          <div className="banner-content text-center">
            <img className="banner-icon wow fadeInUp" data-wow-delay="300ms" data-wow-duration="2500ms" src={icon1} alt="icon" />
            <h1 className="banner-title wow fadeInUp" data-wow-delay="300ms" data-wow-duration="2500ms">
              Fun challenges in the blockchain world.
            </h1>
            <div className="description wow fadeInUp" data-wow-delay="300ms" data-wow-duration="2500ms">
              community-based blockchain experiments such as NFTs, tokens, and staking. challenge together and share together.
            </div>
            <a className="banner-btn wow fadeInUp black-shape-big" data-wow-delay="300ms" data-wow-duration="2500ms" href="https://opensea.io/collection/superurbancat" target="_blank" rel="noreferrer">
              <span className="btn-text">Explore Collections</span>
              <span className="hover-shape1"></span>
              <span className="hover-shape2"></span>
              <span className="hover-shape3"></span>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
