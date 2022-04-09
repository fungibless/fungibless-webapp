import * as React from "react"
import { Helmet } from "react-helmet"
import SearchEngineOptimization from './seo/seo'
import HeaderSection from "../sections/header/header.section"
import FooterSection from "../sections/footer/footer.section"
import WalletSection from "../sections/wallet/wallet.section"

const Layout = ({ children }) => {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script type="application/ld+json">
          {`
              {
                "@context": "http://www.schema.org",
                "@type": "Organization",
                "name": "Fungibless",
                "url": "https://www.fungibless.xyz",
                "description": "Fun challenges in the blockchain world for the community. We pursue fun community-based blockchain experiments such as NFTs, tokens, and staking. We challenge together and share profits together.",
                "image": "https://fungibless.s3.us-east-2.amazonaws.com/image/hj.png"
              }
            `}
        </script>
      </Helmet>
      <SearchEngineOptimization />
      <HeaderSection />
      {children}
      <FooterSection />
      <WalletSection />
    </>
  )
}

export default Layout