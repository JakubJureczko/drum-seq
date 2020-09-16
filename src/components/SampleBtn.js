import React, { useState, useRef, useEffect } from "react";
import classnames from "classnames";
import { Sampler } from "tone";
import styled from "styled-components";
import "./SampleBtn.css";

import A1 from "../assets/samples/S1.wav";
import A2 from "../assets/samples/S2.wav";
import A3 from "../assets/samples/S3.wav";
import A4 from "../assets/samples/S6.wav";
import A5 from "../assets/samples/S7.wav";

const triggers = [
  {
    name: "A1",
    sound: A1,
    displayName: "BD/D",
    keyCode: "KeyD",
  },
  {
    name: "A2",
    sound: A2,
    displayName: "SD/F",
    keyCode: "KeyF",
  },
  {
    name: "A3",
    sound: A3,
    displayName: "CH/J",
    keyCode: "KeyJ",
  },
  {
    name: "A4",
    sound: A4,
    displayName: "OH/K",
    keyCode: "KeyK",
  },
  {
    name: "A5",
    sound: A5,
    displayName: "SMPL/L",
    keyCode: "KeyL",
  },
];

const validKeys = triggers.map(({ keyCode }) => keyCode);
const sounds = triggers.reduce((acc, { sound, name }) => {
  return {
    ...acc,
    [name]: sound,
  };
}, {});

function SampleBtn() {
  const [isLoaded, setLoaded] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const sampler = useRef(null);

  useEffect(() => {
    sampler.current = new Sampler(sounds, {
      onload: () => {
        setLoaded(true);
      },
    }).toDestination();
  }, []);

  const play = (sound) => {
    console.log("playing");
    sampler.current.releaseAll();
    setActiveButton(sound);
    sampler.current.triggerAttack(sound);
  };

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      handleKeyPress(e.code);
    });

    document.addEventListener("keyup", (e) => {
      setActiveButton("");
    });
  }, []);

  function handleKeyPress(keyCode) {
    if (validKeys.indexOf(keyCode) === -1) return;
    const soundName = triggers.find((trigger) => keyCode === trigger.keyCode)
      .name;
    play(soundName);
  }

  return (
    <div className="samplebtn">
      <div className="btnContainer">
        <button className="btn2"></button>
        {triggers.map(({ name, displayName }) => (
          <button
            className={classnames("btn", activeButton === name ? "active" : "")}
            disabled={!isLoaded}
            onMouseDown={() => play(name)}
            onMouseUp={() => setTimeout(setActiveButton(""), 500)}
          >
            {displayName}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SampleBtn;
