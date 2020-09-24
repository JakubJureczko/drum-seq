import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import "./SetBpm.css";

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

const SetBpm = () => {
  const [bpm, setBpm] = useState(95);
  const [isMouseDownPlus, setMouseDownPlus] = useState(false);
  const [isMouseDownMinus, setMouseDownMinus] = useState(false);
  
  Tone.Transport.bpm.value = bpm;

  const downPlus = () => {
    if (bpm < 250){
       setBpm(bpm + 1);
    }else {
       setBpm(bpm)
    }
    
  };

  const downMinus = () => {
    if (bpm > 40){
      setBpm(bpm - 1);
   }else {
      setBpm(bpm)
   }
  }
  
  useInterval(downPlus, isMouseDownPlus ? 150 : null);
  useInterval(downMinus, isMouseDownMinus ? 150 : null);

  return (
    <div className="tempo">
      <div className="spanBpm">
        <span>{bpm}</span>
        <span>bpm</span>
      </div>
      <div className="tempobtn">
        <button
          onMouseDown={() => {
            setMouseDownPlus(true);
            if(bpm < 250){
              setBpm(bpm + 1);
            }else{
              setBpm(bpm)
            }
            
          }}
          onMouseUp={() => setMouseDownPlus(false)}
          onMouseLeave={() => setMouseDownPlus(false)}
        >
          +
        </button>
        <button
          onMouseDown={() => {
            setMouseDownMinus(true);
            if(bpm > 40){
              setBpm(bpm - 1);
            }else{
              setBpm(bpm)
            }
          }}
          onMouseUp={() => setMouseDownMinus(false)}
          onMouseLeave={() => setMouseDownMinus(false)}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default SetBpm;
