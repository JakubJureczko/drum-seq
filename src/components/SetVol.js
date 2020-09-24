import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import "./SetVol.css";

//import Knob from "react-simple-knob";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}



const SetVol = () => {
  const [vol, setVol] = useState(0);
  const [isMousePlus, setMousePlus] = useState(false);
  const [isMouseMinus, setMouseMinus] = useState(false);
  
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
  useInterval(volUp, isMousePlus ? 150 : null);
  useInterval(volDown, isMouseMinus ? 150 : null);

  // const style = {
  //   height: "4em",
  //   fontFamily: "Arial",
  //   color: "black",
  // };

  return (
    <div className="setVol">
      <div className='spanVol'>
        <span>{vol}</span>
        <span className="dB">dB</span>  
      </div>
      <div className="setVolBtn">
      <button onMouseDown={() => {
        setMousePlus(true);
        if (vol < 6) {
          setVol(vol + 1);
        } else {
          setVol(vol);
        }
        }}
        onMouseUp={() => setMousePlus(false)}
        onMouseLeave={() => setMousePlus(false)}
        >+</button>
      <button onMouseDown={() => {
        setMouseMinus(true);
        if (vol > -30) {
          setVol(vol - 1);
        } else {
          setVol(vol);
        }
        }}
        onMouseUp={() => setMouseMinus(false)}
        onMouseLeave={() => setMouseMinus(false)}
        >-</button>
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
