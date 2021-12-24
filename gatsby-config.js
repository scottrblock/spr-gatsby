const siteUrl = "https://stacktopotratio.com";

module.exports = {
  siteMetadata: {
    siteUrl,
    title: "stack to pot ratio",
  },
  plugins: [
    `gatsby-plugin-sass`,
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        resolveSiteUrl: () => siteUrl,
      },
    },
    {
      resolve: "gatsby-plugin-mixpanel",
      options: {
        apiToken: "3fbc91572f4492c1c003eb48f5074af8",
        enableOnDevMode: false,
        pageViews: "all",
        trackPageViewsAs: "myPageView",
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "stack to pot ratio",
        short_name: "spr",
        start_url: "/",
        background_color: "#ffdecf",
        theme_color: "#7a5a85",
        display: "standalone",
        icons: [
          {
            src: `/images/icon-192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/images/icon-512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
  ],
};
