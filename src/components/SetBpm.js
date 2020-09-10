import React, { useState } from "react";
import * as Tone from "tone";
import "./SetBpm.css";

const SetBpm = () => {
  const [bpm, setBpm] = useState(95);
  Tone.Transport.bpm.value = bpm;

  return(
    <div>
        <span>{bpm} bpm</span>
        <button onClick={() => setBpm(bpm + 1) }>+</button>
        <button onClick={() => setBpm(bpm - 1)}>-</button>
      </div>
  )
}

export default SetBpm;