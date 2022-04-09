module.exports = {
  siteMetadata: {
    title: `Fun challenges in the blockchain world for the community.`,
    titleTemplate: `%s | Fungibless`,
    siteUrl: `https://www.fungibless.xyz`,
    description: `We pursue fun community-based blockchain experiments such as NFTs, tokens, and staking. We challenge together and share profits together.`,
    url: 'https://www.fungibless.xyz',
    image: "https://fungibless.s3.us-east-2.amazonaws.com/image/hj.png",
    twitterUsername: "@syous_seo"
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-remove-console',
      options: {
        exclude: ['error', 'warn'],
      }
    },
    "gatsby-plugin-emotion",
    "gatsby-plugin-image",
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Russo+One`,
          `Inter:wght@300;400;500;600;700;800;900`
        ],
        display: 'swap'
      }
    },
    "gatsby-plugin-react-helmet", {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.png"
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp", {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-TPRKPY1LE3"
        ],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: true,
          respectDNT: true
        },
      },
    },
  ]
};