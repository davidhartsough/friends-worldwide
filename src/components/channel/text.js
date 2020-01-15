import React from "react"
import { Link } from "gatsby"
import users from "../../users"

function finalReplacements(txt) {
  let text = txt
  text = text.replace(/&gt;/gi, ">")
  text = text.replace(/&lt;/gi, "<")
  return text
}

export default function Text({ txt }) {
  let text = txt
  if (!text.includes("<")) {
    return <p className="m-text">{finalReplacements(text)}</p>
  }
  while (text.includes("<@U")) {
    const index = text.indexOf("<@U")
    const closeIndex = text.indexOf(">", index) + 1
    const instance = text.substring(index, closeIndex)
    const uid = instance.slice(2, -1)
    const user = users.find(u => u.id === uid)
    const name = "@" + user.name
    text = text.replace(instance, name)
  }
  if (!text.includes("<http") && !text.includes("<#C")) {
    return <p className="m-text">{finalReplacements(text)}</p>
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
          <span key={t + i}>{finalReplacements(t)}</span>
        )
      )}
    </p>
  )
}
