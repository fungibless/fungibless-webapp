module.exports = {
  pathPrefix: '/fungibless-webapp',
  siteMetadata: {
    title: 'Fun challenges in the blockchain world for the community.',
    titleTemplate: '%s | Fungibless',
    siteUrl: 'https://fungibless.github.io',
    description: 'Fungibless is the web3 based community. We do fun blockchain experiments such as NFTs, tokens, and staking on Polygon Network. This is the official minting site for Typical Wage Workers and provides some utilities for the NFT.',
    url: '/',
    image: 'https://fungibless.github.io/fungibless-webapp/images/tww/1.png',
    twitterUsername: '@syous_seo',
  },
  plugins: [
    // {
    //   resolve: 'gatsby-plugin-remove-console',
    //   options: {
    //     exclude: ['error', 'warn'],
    //   },
    // },
    'gatsby-plugin-emotion',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Russo+One',
          'Inter:wght@300;400;500;600;700;800;900',
        ],
        display: 'swap',
      },
    },
    'gatsby-plugin-react-helmet', {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp', {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [
          'G-TPRKPY1LE3',
        ],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
  ],
};
