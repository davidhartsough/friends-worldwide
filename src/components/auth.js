import React, { useState } from "react"
import UserData from "../users.json"
import secrets from "../secrets"
import "./auth.css"

const emails = UserData.users.map(u => u.profile.email)
const gender = Math.random() >= 0.5 ? "gurl" : "boi"

export default function Auth({ setIsLegit }) {
  const [email, setEmail] = useState(`holla@ya.${gender}`)
  const [password, setPassword] = useState("")
  const [wrongEmail, setWrongEmail] = useState(false)
  const [wrongPassword, setWrongPassword] = useState(false)
  const onEmailChange = ({ target }) => setEmail(target.value)
  const onPasswordChange = ({ target }) => setPassword(target.value)
  function verify(e) {
    e.preventDefault()
    const legitEmail = emails.includes(email)
    const legitPassword = password === secrets.password
    if (legitEmail && legitPassword) {
      if (window) window.localStorage.setItem("isLegit", secrets.verified)
      setIsLegit(true)
    } else {
      setWrongEmail(!legitEmail)
      setWrongPassword(!legitPassword)
    }
  }
  return (
    <main>
      <section className="form">
        <form onSubmit={verify}>
          {wrongEmail && (
            <p className="error">Huh... That wasn't a legit email.</p>
          )}
          <label>
            What's the email you use to log in?
            <input type="email" value={email} onChange={onEmailChange} />
          </label>
          {wrongPassword && (
            <p className="error">That wasn't the secret password.</p>
          )}
          <label>
            What's the secret passphrase here?
            <input
              type="password"
              value={password}
              onChange={onPasswordChange}
            />
          </label>
          <input
            type="submit"
            disabled={!email.length || !password.length}
            value="Verify"
          />
        </form>
        <p className="info">
          Not a part of this group yet?
          <br />
          <a href="https://davidhartsough.com/writings/friends-worldwide/">
            Learn more here.
          </a>
        </p>
      </section>
    </main>
  )
}
