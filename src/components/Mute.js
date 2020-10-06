import React from "react";

import "./Mute.css"

import mute from "../assets/images/mute.svg"

const Mute = () => {


  return (
    <div className="mute">
      <span><img className="img1" src={mute} alt="mute" /></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default Mute;