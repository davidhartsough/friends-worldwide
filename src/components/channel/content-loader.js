import React, { useState } from "react"
import "./content-loader.css"

export default function ContentLoader({ html, type }) {
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
