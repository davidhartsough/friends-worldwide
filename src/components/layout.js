import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Auth from "./auth"
import secrets from "../secrets"
import "./layout.css"

const Layout = ({ children }) => {
  const [isLegit, setIsLegit] = useState(true)
  useEffect(() => {
    const start = window
      ? window.localStorage.getItem("isLegit") === secrets.verified
      : true
    setIsLegit(start)
  }, [])
  if (!isLegit) return <Auth setIsLegit={setIsLegit} />
  return (
    <main>
      <section>{children}</section>
    </main>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
