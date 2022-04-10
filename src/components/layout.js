import * as React from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"

import HeaderSection from "../sections/HeaderSection"
import FooterSection from "../sections/FooterSection"
import WalletSection from "../sections/WalletSection"
import SocialSection from '../sections/SocialSection'

import { graphql, useStaticQuery } from "gatsby"

const Layout = ({ children }) => {
  const { pathname } = useLocation()
  const data = useStaticQuery(graphql`
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
      <Helmet title={data.site.siteMetadata.title} titleTemplate={data.site.siteMetadata.titleTemplate}>
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="description" content={data.site.siteMetadata.description} />
        <meta name="image" content={data.site.siteMetadata.image} />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:url" content={`${data.site.siteMetadata.siteUrl}${pathname}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={data.site.siteMetadata.title} />
        <meta property="og:description" content={data.site.siteMetadata.description} />
        <meta property="og:image" content={data.site.siteMetadata.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={data.site.siteMetadata.twitterUsername} />
        <meta name="twitter:title" content={data.site.siteMetadata.title} />
        <meta name="twitter:description" content={data.site.siteMetadata.description} />
        <meta name="twitter:image" content={data.site.siteMetadata.image} />

        <script type="application/ld+json">
          {`
              {
                "@context": "http://www.schema.org",
                "@type": "WebSite",
                "name": "${data.site.siteMetadata.title}",
                "url": "${data.site.siteMetadata.siteUrl}",
                "description": "${data.site.siteMetadata.description}",
                "image": "${data.site.siteMetadata.image}"
              }
            `}
        </script>
      </Helmet>      
      <HeaderSection />
      {children}
      <SocialSection />
      <FooterSection />
      <WalletSection />
    </>
  )
}

export default Layout