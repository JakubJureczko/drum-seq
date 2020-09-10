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

function SampleBtn() {
  
  const [isLoaded, setLoaded] = useState(false);
  const sampler = useRef(null);
  const [currentSampler, setCurrentSampler] = useState();

  useEffect(() => {
    sampler.current = new Sampler(
      { A1, A2, A3, A4, A5 },
      {
        onload: () => {
          setLoaded(true);
        },
      }
    ).toDestination();
  }, []);

  const handleClick = () => sampler.current.triggerAttack("A1");

  const handleClick2 = () => {
    if (currentSampler) {
      currentSampler.stop();
    }
    setCurrentSampler(sampler.current);
    sampler.current.triggerAttack("A2");
  };

  const handleClick3 = () => sampler.current.triggerAttack("A3");

  const handleClick4 = () => sampler.current.triggerAttack("A4");
  const handleClick5 = () => sampler.current.triggerAttack("A5");
  const handleClickX = () => sampler.current.triggerAttack("");

  // useEffect(() =>
  //   document.addEventListener("keydown", (e) => {
  //     handleKeyPress(e.code)

  //   })

  // );
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      handleKeyPress(e.code);
    });

    document.addEventListener("keyup", (e) => {
      if (currentSampler) {
        currentSampler.stop();
      }
    });
  }, []);

  function changeColor(color) {
    document.button.style.background = color;
  }
  const btn = document.getElementById("btn");

  function handleKeyPress(keyCode) {
    if (currentSampler) {
      currentSampler.stop();
    }

    switch (keyCode) {
      case "KeyD":
        handleClick();

        break;
      case "KeyF":
        handleClick2();
        break;
      case "KeyJ":
        handleClick4();
        break;
      case "KeyK":
        handleClick5();
        break;
      case "KeyL":
        handleClick3();
        break;
      default:
        break;
    }
  }


  return (
    <div className="samplebtn">
      <div className="btnContainer">
        <button className="btn2"></button>
        <button className="btn" disabled={!isLoaded} onClick={handleClick}>
          BD/D
        </button>

        <button className="btn" disabled={!isLoaded} onClick={handleClick2}>
          SD/F
        </button>
        <button className="btn" disabled={!isLoaded} onClick={handleClick4}>
          CH/J
        </button>
        <button className="btn" disabled={!isLoaded} onClick={handleClick5}>
          OH/K
        </button>
        <button className="btn" disabled={!isLoaded} onClick={handleClick3}>
          SMPL/L
        </button>
      </div>
    </div>
  );
}

export default SampleBtn;
