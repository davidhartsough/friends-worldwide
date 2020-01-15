import React from "react"
import "./files.css"

export default ({ files }) => (
  <div className="files">
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
  </div>
)
