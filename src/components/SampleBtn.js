import React, { useState, useRef, useEffect } from "react";
import { Sampler } from "tone";
import styled from "styled-components";
import "./SampleBtn.css"

import A1 from "../assets/samples/S1.wav";
import A2 from "../assets/samples/S2.wav";
import A3 from "../assets/samples/S3.wav";
import A4 from "../assets/samples/S6.wav";
import A5 from "../assets/samples/S7.wav";

import "./SampleBtn.css";

const triggers = [
  {
    name: 'A1',
    sound: A1,
    displayName: 'BD/D',
    keyCode: 'KeyD'
  },
  {
    name: 'A2',
    sound: A2,
    displayName: 'SD/F',
    keyCode: 'KeyF'
  },
  {
    name: 'A3',
    sound: A3,
    displayName: 'CH/J',
    keyCode: 'KeyJ'
  },
  {
    name: 'A4',
    sound: A4,
    displayName: 'OH/K',
    keyCode: 'KeyK'
  },
  {
    name: 'A5',
    sound: A5,
    displayName: 'SMPL/L',
    keyCode: 'KeyL'
  }
];

const validKeys = triggers.map(({ keyCode }) => keyCode)
const sounds = triggers.reduce((acc, {sound, name}) => {
  return {
    ...acc,
    [name]: sound
  }
}, {})


function SampleBtn() {
  
  const [isLoaded, setLoaded] = useState(false);
  const sampler = useRef(null);

  useEffect(() => {
    sampler.current = new Sampler(
      sounds,
      {
        onload: () => {
          setLoaded(true);
        },
      }
    ).toDestination();
  }, []);

  const handleClick = (sound) => sampler.current.triggerAttack(sound);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      handleKeyPress(e.code);
    });

    document.addEventListener("keyup", (e) => {
 
    });
  }, []);

  function changeColor(color) {
    document.button.style.background = color;
  }
  const btn = document.getElementById("btn");

  function handleKeyPress(keyCode) {
    if (validKeys.indexOf(keyCode) === -1) return;
    const soundName = triggers.find(trigger => keyCode === trigger.keyCode).name
    handleClick(soundName)
  }


  return (
    <div className="samplebtn">
      <div className="btnContainer">
        <button className="btn2"></button>
        {triggers.map(({name, displayName}) => (
          <button className="btn" disabled={!isLoaded} onClick={() => handleClick(name)}>
            {displayName}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SampleBtn;
