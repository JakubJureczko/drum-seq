import React, { useState } from "react";
import * as Tone from "tone";
import "./SetVol.css";

const SetVol = () => {
  const [vol, setVol] = useState(0)
  Tone.Master.volume.value = vol;

  function volUp() {
    if(vol < 6) {
      setVol(vol + 1)
    }else {
      setVol(vol)
    }
  }
  function volDown(){
    if(vol > -20) {
      setVol(vol - 1)
    }else {
      setVol(vol)
    }
  }

  return(
   <div>
        <span>{vol} dB</span>
        <button onClick={volUp}>
        +
        </button>
        <button onClick={volDown}>-</button>
      </div>
  )
}

export default SetVol;