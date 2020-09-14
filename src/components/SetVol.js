import React, { useState } from "react";
import * as Tone from "tone";
import "./SetVol.css";

import Knob from "react-simple-knob";

const SetVol = () => {
  const [vol, setVol] = useState(0);
  Tone.Master.volume.value = vol;

  function volUp() {
    if (vol < 6) {
      setVol(vol + 1);
    } else {
      setVol(vol);
    }
  }
  function volDown() {
    if (vol > -30) {
      setVol(vol - 1);
    } else {
      setVol(vol);
    }
  }

  const style = {
    height: "4em",
    fontFamily: "Arial",
    color: "black",
  };

  return (
    <div className="setVol">
        <span>{vol} db</span>
      <div className="setVolBtn">
      <button onMouseDown={volUp}>+</button>
      <button onMouseDown={volDown}>-</button>
      </div>
      {/* <div>
        <Knob
          name="Vol"
          unit="dB"
          defaultPercentage={vol}
          onChange={setVol}
          bg="black"
          fg="white"
          mouseSpeed={1}
          transform={(p) => parseInt(p * 30, 10) - 30}
          style={style}
        />
      </div> */}
    </div>
  );
};

export default SetVol;
