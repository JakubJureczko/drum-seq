import React, {useState, useRef, useEffect} from 'react'
import {Sampler} from "tone";
import * as Tone from "tone";
import "./SoundName.css"
import classnames from "classnames";

import D1 from "../assets/drums/sp1200/kick.wav";
import D2 from "../assets/drums/sp1200/kick2.wav";
import D3 from "../assets/drums/sp1200/sn2.wav";
import D4 from "../assets/drums/sp1200/sn4.wav";
import D5 from "../assets/drums/sp1200/hat.wav";
import D6 from "../assets/drums/sp1200/hat3.wav";
import D7 from "../assets/drums/sp1200/snap.wav";


function SoundName(){
  
  const [isLoaded, setLoaded] = useState(false);
  const sampler = useRef(null);
  // const [currentSampler, setCurrentSampler] = useState();

  useEffect(() => {
    sampler.current = new Sampler(
      { D1, D2, D3, D4, D5, D6, D7 },
      {
        onload: () => {
          setLoaded(true);
        },
      }
    ).toDestination();
  }, []);
  // let reverb = new Tone.Reverb(0.8).connect(Tone.Master);
  const handleClick = (sound) => sampler.current.triggerAttack(sound);
  
  // const handleClick2 = (sound) => sampler.current.triggerAttack(sound).chain(reverb);
 
  // let [reverb , setReverb] = useState(0)

  // reverb = new Tone.Reverb(0.8).connect(Tone.Master);
  
  // sampler.current= new Tone.Sampler({ D1, D2, D3, D4, D5, D6, D7 }). chain(reverb)
 

  return (
    <div className="soundname"> 
    <span onMouseDown={() => {handleClick("D1")}} className="bass1"></span>
    <span onMouseDown={() => {handleClick("D2")}} className="bass2"></span>
    <span onMouseDown={() => {handleClick("D3")}} className="snare"></span>
    <span onMouseDown={() => {handleClick("D4")}} className="hihat"></span>
    <span onMouseDown={() => {handleClick("D5")}} className="hihat2"></span>
    <span onMouseDown={() => {handleClick("D6")}} className="openhat"></span>
    <span onMouseDown={() => {handleClick("D7")}} className="closehat"></span>
    </div>
  )
}


export default SoundName;