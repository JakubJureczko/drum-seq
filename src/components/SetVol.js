import React, {useContext, useRef, useEffect,useState} from 'react';
import "./SetVol.css"

import {VolumeContext} from "../volumeContext"

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



const SeqVol = () => {
  const {vol,setVol} = useContext(VolumeContext)
  const [isMousePlus, setMousePlus] = useState(false);
  const [isMouseMinus, setMouseMinus] = useState(false);

  

  function volUp() {
    if (vol < 6) {
      setVol((prevVol) => prevVol + 1);
    } else {
      setVol((prevVol) => prevVol );
    }
  }
  function volDown() {
    if (vol > -30) {
      setVol((prevVol) => prevVol - 1);
    } else {
      setVol((prevVol) => prevVol);
    }
  }
  useInterval(volUp, isMousePlus ? 150 : null);
  useInterval(volDown, isMouseMinus ? 150 : null);

  return (
<div className="setVol">
      <div className='spanVol'>
        <span>{vol}</span>
        <span className="dB">dB</span>  
      </div>
      <div className="setVolBtn">
      <button onMouseDown={() => {
        setMousePlus(true);
        volUp();
        }}
        onMouseUp={() => setMousePlus(false)}
        onMouseLeave={() => setMousePlus(false)}
        >+</button>
      <button onMouseDown={() => {
        setMouseMinus(true);
        volDown();
        }}
        onMouseUp={() => setMouseMinus(false)}
        onMouseLeave={() => setMouseMinus(false)}
        >-</button>
      </div>
      
    </div>
  )
}

export default SeqVol;