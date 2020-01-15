import React from "react"
import Text from "./text"
import Message from "./message"

export default function MessageNode({ node, thread }) {
  const {
    text,
    user_profile,
    reply_count,
    reactions,
    files,
    attachments,
  } = node

  // General channel info message
  if (!user_profile && !files) {
    return (
      <div className="message">
        <Text txt={text} />
      </div>
    )
  }

  // Regular ole message
  return (
    <Message
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
