import React from "react"
import Helmet from "react-helmet"

export default ({ title }) => (
  <Helmet
    htmlAttributes={{
      lang: "en",
    }}
    title={title}
    titleTemplate={`%s | Friends Worldwide`}
  >
    <meta
      name="description"
      content="Friends Worldwide: the RAD Slack group for RAD friends."
    />
    <meta
      name="keywords"
      content="friends, worldwide, world, slack, group, space, social, archive"
    />
    <meta name="author" content="David Hartsough" />
    <meta property="og:title" content="Friends Worldwide" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta
      property="og:description"
      content="Friends Worldwide: the RAD Slack group for RAD friends."
    />
    <meta property="og:site_name" content="Friends Worldwide" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="application-name" content="Friends Worldwide" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="Friends Worldwide" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="format-detection" content="telephone=no" />
  </Helmet>
)
