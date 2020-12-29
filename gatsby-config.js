const fs = require(`fs`)
const yaml = require(`js-yaml`)
const metadata = yaml.safeLoad(
  fs.readFileSync(`content/metadata/index.yaml`, `utf8`)
)
const contentPath = `content`
const favicon = metadata.favicon ? `content/metadata/${metadata.favicon}` : ``

module.exports = {
  siteMetadata: {
    title: metadata.title,
    description: metadata.description,
    siteUrl: metadata.siteUrl
  },
  plugins: [
    {
      resolve: `@marscollective/gatsby-theme-core`,
      options: { contentPath, favicon, metadata }
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(`${__dirname}/src/theme/tailwind.config.js`),
          require(`autoprefixer`),
          require(`postcss-nested`)
        ]
      }
    },
    `gatsby-plugin-anchor-links`,
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        htmlTitle: `${metadata.title}: CMS`,
        htmlFavicon: favicon,
        modulePath: `${__dirname}/src/cms`,
        manualInit: true,
        enableIdentityWidget: false
      }
    }
  ]
}
