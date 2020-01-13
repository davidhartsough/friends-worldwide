module.exports = {
  siteMetadata: {
    title: "Friends Worldwide",
    description: "Friends Worldwide: the RAD Slack group for RAD friends.",
    author: "David",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: "messages",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `slack`,
        path: `${__dirname}/slack`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Friends Worldwide`,
        short_name: `Friends`,
        start_url: `/`,
        background_color: `#191c21`,
        theme_color: `#e6e6e6`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
}
