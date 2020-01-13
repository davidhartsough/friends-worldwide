import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import HelmetHead from "../components/seo"
import ChannelData from "../channels.json"

const channels = ChannelData.channels.sort((a, b) => (a.name > b.name ? 1 : -1))

const IndexPage = () => (
  <Layout>
    <HelmetHead title="Channels" />
    <h1 className="title">Friends Worldwide</h1>
    <nav>
      {channels.map(({ id, name, purpose }) => (
        <p key={id}>
          <Link className="channel-link" to={`/${name}`}>
            #{name}
          </Link>{" "}
          {purpose.value.length > 0 && (
            <span className="purpose">[{purpose.value}]</span>
          )}
        </p>
      ))}
    </nav>
  </Layout>
)

export default IndexPage
