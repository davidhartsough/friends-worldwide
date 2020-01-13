import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import HelmetHead from "../components/seo"

export default () => (
  <Layout>
    <HelmetHead title="404: Not found" />
    <h1>NOPE. NOT A PAGE.</h1>
    <p>
      THIS IS NOT A PAGE. PLEASE <Link to="/">GO HOME</Link>.
    </p>
  </Layout>
)
