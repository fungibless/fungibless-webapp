module.exports = {  
  siteMetadata: {
    title: `Fun challenges in the blockchain world for the community.`,
    titleTemplate: `%s | Fungibless`,
    siteUrl: `https://www.fungibless.xyz`,
    description: `We pursue fun community-based blockchain experiments such as NFTs, tokens, and staking. We challenge together and share profits together.`,
    url: 'https://www.fungibless.xyz',
    image: "",
    twitterUsername: ""
  },
  plugins: [
    // {
    //   resolve: 'gatsby-plugin-remove-console',
    //   options: {
    //     exclude: ['error', 'warn'], // <- will be removed all console calls except these
    //   }
    // },
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
    }]
};