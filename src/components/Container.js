import React from "react"

import "./Conrainer.css"

const Container = ({ children }) => {
  return (
    <div className="container">
      {children}
    </div>
  )
}

export default Container;