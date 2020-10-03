import React, { useState, useRef, useEffect, useInterval } from "react";
import classnames from "classnames";
import { Sampler } from "tone";
import styled from "styled-components";
import "./SampleBtn.css";
import * as Tone from "tone";
import A1 from "../assets/samples/D1.WAV";
import A2 from "../assets/samples/D2.WAV";
import A3 from "../assets/samples/D3.WAV";
import A4 from "../assets/samples/D4.WAV";
import A5 from "../assets/samples/D5.WAV";
import A6 from "../assets/samples/D6.WAV";
import A7 from "../assets/samples/D7.WAV";
import A8 from "../assets/samples/D8.WAV";
import A9 from "../assets/samples/D9.WAV";
import A10 from "../assets/samples/D10.WAV";
import A11 from "../assets/samples/D11.WAV";
import A12 from "../assets/samples/D12.WAV";
const triggers = [
  {
    name: "A1",
    sound: A1,
    displayName: "E",
    keyCode: "KeyE",
  },
  {
    name: "A2",
    sound: A2,
    displayName: "R",
    keyCode: "KeyR",
  },
  {
    name: "A3",
    sound: A3,
    displayName: "T",
    keyCode: "KeyT",
  },
  {
    name: "A4",
    sound: A4,
    displayName: "U",
    keyCode: "KeyU",
  },
  {
    name: "A5",
    sound: A5,
    displayName: "I",
    keyCode: "KeyI",
  },
  {
    name: "A6",
    sound: A6,
    displayName: "O",
    keyCode: "KeyO",
  },
  {
    name: "A7",
    sound: A7,
    displayName: "D",
    keyCode: "KeyD",
  },
  {
    name: "A8",
    sound: A8,
    displayName: "F",
    keyCode: "KeyF",
  },
  {
    name: "A9",
    sound: A9,
    displayName: "G",
    keyCode: "KeyG",
  },
  {
    name: "A10",
    sound: A10,
    displayName: "J",
    keyCode: "KeyJ",
  },
  {
    name: "A11",
    sound: A11,
    displayName: "K",
    keyCode: "KeyK",
  },
  {
    name: "A12",
    sound: A12,
    displayName: "L",
    keyCode: "KeyL",
  }
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
  const [vol, setVol] = useState(0);

  const sampler = useRef(null);

  useEffect(() => {
    sampler.current = new Sampler(sounds, {
      onload: () => {
        setLoaded(true);
      },
    }).toDestination();
  }, []);

  //const rev = new Tone.Reverb(1).toDestination();
  //const distortion = new Tone.Distortion(0.6).toDestination();
  //.connect(distortion, rev)

  //const feedbackDelay = new Tone.FeedbackDelay(0.1, 0.2).toDestination();

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

  useEffect(() => {
    sampler.current.volume.value = vol;
  }, [vol]);

  function handleKeyPress(keyCode) {
    if (validKeys.indexOf(keyCode) === -1) return;
    const soundName = triggers.find((trigger) => keyCode === trigger.keyCode)
      .name;
    play(soundName);
  }

  const volume = (event) => {
    setVol(event.target.value);
  };

  return (
    <div className="samplebtn">
      <div className="btnContainer">
        <div className="btnlogo">
        <button className="btn2">
          <input
            onChange={volume}
            value={vol}
            id="volM"
            type="range"
            name="vol"
            min={-30}
            max={6}
            step="1"
          />
        </button>
        </div>
        <div classnames="btnsample">
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
    </div>
  );
}

export default SampleBtn;
