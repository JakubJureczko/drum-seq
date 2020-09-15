import React, { useState } from "react";
import * as Tone from "tone";
import "./Swing.css";

const Swing = () => {
  const [swinger, setSwinger] = useState(0);
  

Tone.Transport.swing = swinger;
Tone.Transport.swingSubdivision = '16n';

  return(
    <div className="swing">
        <span>{swinger} swing</span>
        <div className='swingbtn'>
        <button onClick={() => {
          if(swinger < 1 ) {
            Math.round(setSwinger(swinger + 0.1)) 
          }
          }}>+</button>
        <button onClick={() => setSwinger(swinger - 0.1)}>-</button>
        </div>
      </div>
  )
}

export default Swing;