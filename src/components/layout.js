import * as React from "react"
import { Helmet } from "react-helmet"
import SearchEngineOptimization from './seo/seo'
import HeaderSection from "../sections/header/header.section"
import FooterSection from "../sections/footer/footer.section"
import WalletSection from "../sections/wallet/wallet.section"
import SpinnerSection from '../sections/spinner/spinner.section'

const Layout = ({ headerType, children }) => {
  return (
    <React.Fragment>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Helmet>
      <SearchEngineOptimization />
      <SpinnerSection />
      <HeaderSection headerType={headerType} />
      {children}
      <FooterSection />
      <WalletSection />
    </React.Fragment>
  )
}

export default Layout