import * as React from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"

import HeaderSection from "../sections/header/header.section"
import FooterSection from "../sections/footer/footer.section"
import WalletSection from "../sections/wallet/wallet.section"
import { graphql, useStaticQuery } from "gatsby"

const Layout = ({ children }) => {
  const { pathname } = useLocation()
  const site = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          titleTemplate
          description
          siteUrl
          image
          twitterUsername
        }
      }
    }
  `)
  return (
    <>
      <Helmet title={site.title} titleTemplate={site.titleTemplate}>
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="description" content={site.description} />
        <meta name="image" content={site.image} />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:url" content={`${site.siteUrl}${pathname}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={site.title} />
        <meta property="og:description" content={site.description} />
        <meta property="og:image" content={site.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={site.twitterUsername} />
        <meta name="twitter:title" content={site.title} />
        <meta name="twitter:description" content={site.description} />
        <meta name="twitter:image" content={site.image} />

        <script type="application/ld+json">
          {`
              {
                "@context": "http://www.schema.org",
                "@type": "WebSite",
                "name": "${site.title}",
                "url": "${site.siteUrl}",
                "description": "${site.description}",
                "image": "${site.image}"
              }
            `}
        </script>
      </Helmet>      
      <HeaderSection />
      {children}
      <FooterSection />
      <WalletSection />
    </>
  )
}

export default Layout