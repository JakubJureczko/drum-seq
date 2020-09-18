import React, {useState, useRef, useEffect} from 'react'
import {Sampler} from "tone";
import "./SoundName.css"

import D1 from "../assets/drums/bd1.mp3";
import D2 from "../assets/drums/bd2.mp3";
import D3 from "../assets/drums/sd1.mp3";
import D4 from "../assets/drums/ch1.mp3";
import D5 from "../assets/drums/ch2.mp3";
import D6 from "../assets/drums/ch2.mp3";
import D7 from "../assets/drums/oh.mp3";


function SoundName(){
  const [isLoaded, setLoaded] = useState(false);
  
  const sampler = useRef(null);

  useEffect(() => {
    sampler.current = new Sampler( {
      onload: () => {
        setLoaded(true);
      },
    }).toDestination();
  }, []);

  const play = (sound) => {
   
    
    sampler.current.triggerAttack(sound);
  };

  return (
    <div className="soundname"> 
    <span onMouseDown={() => {play(D1)}}className="bass1"></span>
    <span className="bass2"></span>
    <span className="snare"></span>
    <span className="hihat"></span>
    <span className="openhat"></span>
    <span className="openhat2"></span>
    <span className="closehat"></span>
    </div>
  )
}


export default SoundName;