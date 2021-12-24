import * as React from "react";
import { Helmet } from "react-helmet";

const Seo = ({
  description = "visualize your stack to pot ratio (spr) across the flop, turn, and river",
  lang = "en",
  meta = [],
  title = "visualize your spr",
  image = `https://stacktopotratio.com/images/og-image.png`,
}) => {
  const defaultTitle = "stacktopotratio.com";

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title.toLocaleLowerCase()}
      defaultTitle={defaultTitle ? `%s | ${defaultTitle}` : null}
      titleTemplate={title === defaultTitle ? null : `${defaultTitle} | %s`}
      link={[
        {
          rel: "icon",
          href: "https://stacktopotratio.com/favicon.ico",
          sizes: "any",
        },
        {
          rel: "icon",
          href: "https://stacktopotratio.com/images/logo.svg",
          type: "image/svg+xml",
        },
        {
          rel: "apple-toch-icon",
          href: "https://stacktopotratio.com/images/apple-touch-icon.png",
        },
      ]}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          name: `image`,
          content: image,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: image,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:image`,
          content: `https://www.phonetonote.com/images/twitter-image.png`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
      ].concat(meta)}
    />
  );
};

export default Seo;
