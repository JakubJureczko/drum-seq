import React, { useState } from "react";
import * as Tone from "tone";
import "./Swing.css";

const Swing = () => {
  const [swinger, setSwinger] = useState(0);

  Tone.Transport.swing = swinger;
  Tone.Transport.swingSubdivision = "16n";

  function swingUp() {
    if (swinger < 1) {
      setSwinger(swinger + 0.25);
    } else {
      setSwinger(swinger);
    }
  }

  function swingDown() {
    if (swinger > 0) {
      setSwinger(swinger - 0.25);
    } else {
      setSwinger(swinger);
    }
  }

  return (
    <div className="swing">
      <div className="spanSwing">
      <span>{swinger}</span>
      <span className="swg">swg</span>
      </div>
      <div className="swingBtn">
        <button onMouseDown={swingUp}>+</button>
        <button onMouseDown={swingDown}>-</button>
      </div>
    </div>
  );
};

export default Swing;
