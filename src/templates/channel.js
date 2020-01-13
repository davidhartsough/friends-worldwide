import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import HelmetHead from "../components/seo"
import "./channel.css"

import UserData from "../users.json"
const users = UserData.users.map(({ id, real_name }) => ({
  id,
  real_name,
}))

function Text({ txt }) {
  let text = txt
  if (!text.includes("<")) {
    return <p className="m-text">{text}</p>
  }
  while (text.includes("<@U")) {
    const index = text.indexOf("<@U")
    const closeIndex = text.indexOf(">", index) + 1
    const instance = text.substring(index, closeIndex)
    const uid = instance.slice(2, -1)
    const user = users.find(u => u.id === uid)
    const name = "@" + user.real_name
    text = text.replace(instance, name)
  }
  if (!text.includes("<http") && !text.includes("<#C")) {
    return <p className="m-text">{text}</p>
  }
  while (text.includes("<#C")) {
    const index = text.indexOf("<#C")
    const closeIndex = text.indexOf(">", index) + 1
    const instance = text.substring(index, closeIndex)
    const slug = instance.slice(instance.indexOf("|") + 1, -1)
    text = text.replace(instance, `<>#${slug}<>`)
  }
  while (text.includes("<http")) {
    const index = text.indexOf("<http")
    const closeIndex = text.indexOf(">", index) + 1
    const instance = text.substring(index, closeIndex)
    const url = instance.slice(1, -1)
    text = text.replace(instance, `<>${url}<>`)
  }
  const textSplit = text.split("<>")
  return (
    <p className="m-text">
      {textSplit.map((t, i) =>
        t.length === 0 ? null : t.startsWith("http") ? (
          <a key={t + i} href={t} target="_blank" rel="noopener noreferrer">
            {t}
          </a>
        ) : t.startsWith("#") ? (
          <Link key={t + i} to={`/${t.slice(1)}`} className="channel-link">
            {t}
          </Link>
        ) : (
          <span key={t}>{t}</span>
        )
      )}
    </p>
  )
}

const Reactions = ({ reactions }) => (
  <div className="reactions">
    {reactions.map(({ name, count }) => (
      <div key={name + count} className="reaction">
        :{name}: <span className="count">{count}</span>
      </div>
    ))}
  </div>
)

const Message = ({ user, text, reactions, attachments }) => (
  <div className="message">
    <div className="avatar">
      <img src={user.image_72} alt="avatar" />
    </div>
    <div className="m-body">
      <p className="m-name">{user.real_name}</p>
      <Text txt={text} />
      {attachments && <Attachments attachments={attachments} />}
      {reactions && <Reactions reactions={reactions} />}
    </div>
  </div>
)

const Thread = ({ count, children }) => (
  <details>
    <summary>{count > 1 ? `${count} replies` : `1 reply`}</summary>
    <div className="thread">{children}</div>
  </details>
)

function getUserName(uid) {
  const user = users.find(u => u.id === uid)
  if (!user) return ""
  return user.real_name
}

const Files = ({ text, files, reactions, thread, replyCount, threads }) => (
  <div className="message">
    <div className="m-body">
      <p className="m-name">{getUserName(files[0].user)}</p>
      <Text txt={text} />
      {files.map(({ id, title, thumb_360, thumb_video }) => (
        <div key={id} className="file">
          <p className="file-title">{title}</p>
          <img
            className="file-thumb"
            src={thumb_video ? thumb_video : thumb_360}
            alt={title}
          />
        </div>
      ))}
      {reactions && <Reactions reactions={reactions} />}
      {thread !== null && (
        <Thread count={replyCount}>
          {threads[thread] &&
            threads[thread].map(({ id, text, user }) => (
              <Message key={id} text={text} user={user} reactions={reactions} />
            ))}
        </Thread>
      )}
    </div>
  </div>
)

function ContentLoader({ html, type }) {
  const [load, setLoad] = useState(false)
  const handleClick = () => setLoad(true)
  if (load) {
    return (
      <div className="iframe-c" dangerouslySetInnerHTML={{ __html: html }} />
    )
  }
  return (
    <div className="content-loader">
      <button className="load-btn" onClick={handleClick}>
        Load {type}
      </button>
    </div>
  )
}

const Attachments = ({ attachments }) => (
  <div className="attachments">
    {attachments.map(
      ({
        title,
        video_html,
        audio_html,
        image_url,
        original_url,
        thumb_url,
        text,
      }) => (
        <div key={title + original_url} className="attachment">
          <p>
            <a
              className="attachment-link"
              href={original_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title ? title : original_url}
            </a>
          </p>
          {text && text.length > 0 && <p className="attachment-text">{text}</p>}
          <div className="attachment-content">
            {video_html ? (
              <ContentLoader
                html={video_html
                  .replace("&autoplay=1", "")
                  .replace("autoplay=1&", "")}
                type="video"
              />
            ) : audio_html ? (
              <ContentLoader html={audio_html} type="audio" />
            ) : image_url ? (
              <img src={image_url} alt={title} />
            ) : thumb_url ? (
              <img src={thumb_url} alt={title} />
            ) : null}
          </div>
        </div>
      )
    )}
  </div>
)

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
        const {
          id,
          text,
          user_profile,
          thread_ts,
          reply_count,
          reactions,
          upload,
          files,
          attachments,
        } = node
        if (!user_profile) {
          if (upload === true && files) {
            return (
              <Files
                key={id}
                text={text}
                files={files}
                reactions={reactions}
                thread={thread_ts}
                replyCount={reply_count}
                threads={threads}
              />
            )
          }
          if (
            !text ||
            !text.length ||
            text.includes("> has joined the channel")
          ) {
            return null
          }
          return (
            <div key={id} className="message">
              <Text txt={text} />
            </div>
          )
        }
        if (thread_ts !== null) {
          return (
            <div key={id} className="message">
              <div className="avatar">
                <img src={user_profile.image_72} alt="avatar" />
              </div>
              <div className="m-body">
                <p className="m-name">{user_profile.real_name}</p>
                <Text txt={text} />
                {attachments && <Attachments attachments={attachments} />}
                {reactions && <Reactions reactions={reactions} />}
                <Thread count={reply_count}>
                  {threads[thread_ts] &&
                    threads[
                      thread_ts
                    ].map(({ id, text, user, reactions, attachments }) => (
                      <Message
                        key={id}
                        text={text}
                        user={user}
                        reactions={reactions}
                        attachments={attachments}
                      />
                    ))}
                </Thread>
              </div>
            </div>
          )
        }
        return (
          <Message
            key={id}
            text={text}
            user={user_profile}
            reactions={reactions}
            attachments={attachments}
          />
        )
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
          upload
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
