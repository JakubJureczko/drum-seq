import React, { useState } from "react";
import * as Tone from "tone";
import "./SetBpm.css";

const SetBpm = () => {
  const [bpm, setBpm] = useState(95);
  Tone.Transport.bpm.value = bpm;

  return(
    <div className="tempo">
      <div className="spanBpm">
        <span>{bpm}</span>
        <span>bpm</span>
      </div>
        <div className='tempobtn'>
        <button onMouseDown={() => setBpm(bpm + 1) }>+</button>
        <button onMouseDown={() => setBpm(bpm - 1)}>-</button>
        </div>
      </div>
  )
}

export default SetBpm;