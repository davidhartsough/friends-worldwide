import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import HelmetHead from "../components/seo"
import MessageNode from "../components/channel/message-node"
import "./channel.css"

export default function Channel({ data, pageContext }) {
  const threads = {}
  data.threads.edges.forEach(({ node }) => {
    const { id, text, user_profile, thread_ts, reactions, attachments } = node
    const message = {
      id,
      text,
      user: user_profile,
      reactions,
      attachments,
    }
    if (threads[thread_ts]) {
      threads[thread_ts].push(message)
    } else {
      threads[thread_ts] = [message]
    }
  })
  return (
    <Layout>
      <HelmetHead title={pageContext.channel} />
      <header>
        <div className="fww-header">
          <Link to="/" className="fww-link">
            Friends Worldwide
          </Link>
        </div>
      </header>
      <h1 className="channel-name">#{pageContext.channel}</h1>
      {data.messages.edges.map(({ node }) => {
        const thread = node.thread_ts ? threads[node.thread_ts] : null
        return <MessageNode key={node.id} node={node} thread={thread} />
      })}
    </Layout>
  )
}
export const query = graphql`
  query($channel: String!) {
    messages: allMessages(
      filter: {
        fields: { channel: { eq: $channel } }
        parent_user_id: { eq: null }
      }
      sort: { fields: ts }
    ) {
      edges {
        node {
          id
          text
          user_profile {
            real_name
            image_72
          }
          thread_ts
          reply_count
          reactions {
            name
            count
          }
          files {
            id
            user
            title
            thumb_360
            thumb_video
          }
          attachments {
            title
            video_html
            audio_html
            original_url
            image_url
            thumb_url
            text
          }
        }
      }
    }
    threads: allMessages(
      filter: {
        fields: { channel: { eq: $channel } }
        user_profile: { real_name: { ne: null } }
        parent_user_id: { ne: null }
      }
      sort: { fields: thread_ts }
    ) {
      edges {
        node {
          id
          text
          user_profile {
            real_name
            image_72
          }
          thread_ts
          reactions {
            name
            count
          }
          attachments {
            title
            video_html
            audio_html
            original_url
            image_url
            thumb_url
            text
          }
        }
      }
    }
  }
`
