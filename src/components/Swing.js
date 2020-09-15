import React, { useState } from "react";
import * as Tone from "tone";
import "./Swing.css";

const Swing = () => {
  const [swinger, setSwinger] = useState(0);

  Tone.Transport.swing = swinger;
  Tone.Transport.swingSubdivision = "16n";

  function swingUp() {
    if (swinger < 1) {
      setSwinger(swinger + 0.5);
    } else {
      setSwinger(swinger);
    }
  }

  function swingDown() {
    if (swinger > 0) {
      setSwinger(swinger - 0.5);
    } else {
      setSwinger(swinger);
    }
  }

  return (
    <div className="swing">
      <span>{swinger} swing</span>
      <div className="swingBtn">
        <button onMouseDown={swingUp}>+</button>
        <button onMouseDown={swingDown}>-</button>
      </div>
    </div>
  );
};

export default Swing;
