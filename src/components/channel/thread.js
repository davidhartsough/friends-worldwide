import React from "react"
import Message from "./message"
import "./thread.css"

export default ({ count, thread }) => (
  <details>
    <summary>{count > 1 ? `${count} replies` : `1 reply`}</summary>
    <div className="thread">
      {thread.map(({ id, text, user, reactions, attachments }) => (
        <Message
          key={id}
          text={text}
          user={user}
          reactions={reactions}
          attachments={attachments}
        />
      ))}
    </div>
  </details>
)
