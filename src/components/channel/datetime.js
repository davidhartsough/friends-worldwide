import React from "react"

const options = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
}

export default function DateTime({ ts }) {
  const datetime = new Date(Number(ts.slice(0, ts.indexOf("."))) * 1000)
  return (
    <p className="datetime">{datetime.toLocaleString(undefined, options)}</p>
  )
}
