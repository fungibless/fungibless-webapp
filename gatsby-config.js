module.exports = {
  siteMetadata: {
    title: `Fun challenges in the blockchain world for the community.`,
    titleTemplate: `%s | Fungibless`,
    siteUrl: `https://www.fungibless.xyz`,
    description: `We pursue fun community-based blockchain experiments such as NFTs, tokens, and staking. We challenge together and share profits together.`,
    url: '',
    image: "",
    twitterUsername: ""
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-image",
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `VT323\:400`
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