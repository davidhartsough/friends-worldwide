import React from "react"
import DateTime from "./datetime"
import Text from "./text"
import Message from "./message"

export default function MessageNode({ node, thread }) {
  const {
    ts,
    text,
    user_profile,
    reply_count,
    reactions,
    files,
    attachments,
  } = node

  // General channel info message
  if (!user_profile && !files) {
    if (!text) return null
    return (
      <div className="message">
        <DateTime ts={ts} />
        <Text txt={text} />
      </div>
    )
  }

  // Regular ole message
  return (
    <Message
      ts={ts}
      text={text}
      user={user_profile}
      files={files}
      attachments={attachments}
      reactions={reactions}
      replyCount={reply_count}
      thread={thread}
    />
  )
}
