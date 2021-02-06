require('dotenv').config()

const gatsbyConfig = {
  siteMetadata: {
    titleTemplate: '%s · The Real Hero',
    description: `#VetsWhoCode is a veteran-led 501(c)(3) charitable non-profit that focuses on teaching veterans how to program free of charge so that they may find gainful employment after service.`,
    url: `https://www.vetswhocode.io`, // No trailing slash allowed!
    image: `/images/meta-image.jpg`, // Path to your image you placed in the 'static' folder
    twitterUsername: `@vetswhocode`,
    title: `#VetsWhoCode 🇺🇸 `,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        // your google analytics tracking id
        trackingId: `UA-73856435-2`,

        head: false,
        // enable ip anonymization
        anonymize: true,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        // printRejected: true, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
        purgeOnly: [`components/`, `/main.css`, `bootstrap/`, `css/`], // Purge only these files/folders
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: `${__dirname}/src/images/favicon.png`,
      },
    },
    `gatsby-plugin-preload-fonts`,
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: `Roboto Slab`,
              variants: [`100`, `300`, `400`, `700`],
            },
            {
              family: `Open Sans`,
              variants: [`300`, `300i`, `400`, `400i`, `800`],
            },
            {
              family: `Lato`,
              variants: [`300`, `400`, `700`, `900`],
            },
          ],
        },
      },
    },
  ],
  pathPrefix: `/`,
}

const contentfulConfig = {
  resolve: `gatsby-source-contentful`,
  options: {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    /**
     * We currently have a master environment and a development environment in contentful.
     * The master environment is for our production environment that is used on the live app.
     * The development environment enables the ability to develop features without
     * interrupting the production environment. Make sure you have set this environment variable
     * if you need to use the development environment.
     */
    environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  },
}

if (process.env.NODE_ENV === 'production' || process.env.DISPLAY_CONTENTFUL_CONTENT) {
  gatsbyConfig.plugins.push(contentfulConfig)
}

module.exports = gatsbyConfig
