import React from "react"
import "./reactions.css"

export default ({ reactions }) => (
  <div className="reactions">
    {reactions.map(({ name, count }) => (
      <div key={name + count} className="reaction">
        :{name}: <span className="count">{count}</span>
      </div>
    ))}
  </div>
)
