import React, { useState, useRef, useEffect, useInterval } from "react";
import classnames from "classnames";
import { Sampler } from "tone";
import styled from "styled-components";
import "./SampleBtn.css";
import * as Tone from "tone";
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
  const [vol, setVol] = useState(0);
  const [isMousePlus, setMousePlus] = useState(false);
  const [isMouseMinus, setMouseMinus] = useState(false);

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
    sampler.current.volume.value = vol;
  };

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
  useInterval(volUp, isMousePlus ? 200 : null);
  useInterval(volDown, isMouseMinus ? 200 : null);

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
        <button className="btn2">
          <div className="btnvol">
            <div className="plusminus">
              <button
                className="volplus"
                onMouseDown={() => {
                  setMousePlus(true);
                  if (vol < 6) {
                    setVol(vol + 1);
                  } else {
                    setVol(vol);
                  }
                }}
                onMouseLeave={() => setMousePlus(false)}
                onMouseUp={() => setMousePlus(false)}
              >
                +
              </button>
              <button
                className="volminus"
                onMouseDown={() => {
                  setMouseMinus(true);
                  if (vol > -30) {
                    setVol(vol - 1);
                  } else {
                    setVol(vol);
                  }
                }}
                onMouseUp={() => setMouseMinus(false)}
                onMouseLeave={() => setMouseMinus(false)}
              >
                -
              </button>
            </div>
            <span>{vol}dB</span>
          </div>
        </button>
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
