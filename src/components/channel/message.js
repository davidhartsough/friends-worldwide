import React from "react"
import Text from "./text"
import Files from "./files"
import Attachments from "./attachments"
import Reactions from "./reactions"
import Thread from "./thread"
import users from "../../users"
import "./message.css"

function getUserName(uid) {
  const user = users.find(u => u.id === uid)
  return user ? user.name : null
}

export default ({
  user,
  text,
  files = null,
  attachments = null,
  reactions = null,
  replyCount = null,
  thread = null,
}) => (
  <div className="message">
    {!files && (
      <div className="avatar">
        <img src={user.image_72} alt="avatar" />
      </div>
    )}
    <div className="m-body">
      <p className="m-name">
        {files ? getUserName(files[0].user) : user.real_name}
      </p>
      <Text txt={text} />
      {files && <Files files={files} />}
      {attachments && <Attachments attachments={attachments} />}
      {reactions && <Reactions reactions={reactions} />}
      {thread && <Thread count={replyCount} thread={thread} />}
    </div>
  </div>
)
