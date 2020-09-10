import React, { useCallback, useState, useEffect } from "react";
import * as Tone from "tone";
import "./Seq.css";

import {
  faRecordVinyl,
  faCompactDisc,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import D1 from "../assets/drums/bd1.mp3";
import D2 from "../assets/drums/bd2.mp3";
import D3 from "../assets/drums/sd1.mp3";
import D4 from "../assets/drums/ch1.mp3";
import D5 from "../assets/drums/ch2.mp3";
import D6 from "../assets/drums/ch2.mp3";
import D7 from "../assets/drums/oh.mp3";

const drums = ["D1", "D2", "D3", "D4", "D5", "D6", "D7"];

const initialPattern = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// Tone.Transport.state

const seq = new Tone.Sampler({
  D1,
  D2,
  D3,
  D4,
  D5,
  D6,
  D7,
}).toMaster();



const Sequencer = () => {
  const [playState, setPlayState] = useState(false);
  const [activeColumn, setColumn] = useState(0);
  const [pattern, updatePattern] = useState(initialPattern);
  const [bpm, setBpm] = useState(95);
  const [vol, setVol] = useState(0)

  Tone.Transport.bpm.value = bpm;
  Tone.Master.volume.value = vol;
  
  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      handleKeyPress(e.code);
    });
  }, []);

  useEffect(
    () => {
      const loop = new Tone.Sequence(
        (time, col) => {
          // Update active column for animation
          setColumn(col);

          // Loop current pattern
          pattern.map((row, noteIndex) => {
            // If active
            if (row[col]) {
              // Play based on which row
              seq.triggerAttackRelease(drums[noteIndex], "8n", time);
            }
          });
        },
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "16n"
      ).start(0);
      return () => loop.dispose();
    },
    [pattern] // Retrigger when pattern changes
  );

  function handleStart() {
    setPlayState(!playState);
  }

  function handleKeyPress(keyCode) {
    if (keyCode === "Space") {
      toggle();
      handleStart();
    }
  }
  function volUp() {
    if(vol < 6) {
      setVol(vol + 1)
    }else {
      setVol(vol)
    }
  }
  function volDown(){
    if(vol > -20) {
      setVol(vol - 1)
    }else {
      setVol(vol)
    }
  }

  // Toggle playing / stopped
  const toggle = useCallback(() => {
    Tone.Transport.toggle();
  }, []);

  // Update pattern by making a copy and inverting the value
  function setPattern({ x, y, value }) {
    const patternCopy = [...pattern];
    patternCopy[y][x] = +!value;
    updatePattern(patternCopy);
  }

  console.log(pattern);
  return (
    <div>
      <div className="seqBorder">
        {pattern.map((row, y) => (
          <div className="outter">
            <div key={y} style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}>
              {row.map((value, x) => (
                <Square
                  key={x}
                  row={y}
                  active={activeColumn === x}
                  selected={value}
                  onClick={() => setPattern({ x, y, value })}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        className="startBtn"
        onKeyPress={handleKeyPress}
        onClick={() => {
          toggle();
          handleStart();
        }}
      >
        {playState ? (
          <FontAwesomeIcon
            icon={faCompactDisc}
            size="8x"
            style={{ color: "rgba(133, 65, 243, 0.8)" }}
            transform="left-1"
            spin
          />
        ) : (
          <FontAwesomeIcon
            icon={faRecordVinyl}
            size="8x"
            style={{ color: "rgba(133, 65, 243, 0.8)" }}
            transform="left-1.1"
          />
        )}
      </button>
      <div>
        <span>{bpm} bpm</span>
        <button onClick={() => setBpm(bpm + 1) }>+</button>
        <button onClick={() => setBpm(bpm - 1)}>-</button>
      </div>
      <div>
        <span>{vol} dB</span>
        <button onClick={volUp}>
        +
        </button>
        <button onClick={volDown}>-</button>
      </div>
      
    </div>
  );
};

const getColor = (row) => {
  switch (row) {
    case 0:
      return "#a374d5";
    case 1:
      return "#be97dc";
    case 2:
      return "rgb(186,225,255)";
    case 3:
      return "rgb(186,255,201)";
    case 4:
      return "rgb(255,255,186)";
    case 5:
      return "rgba(255,223,186)";
    default:
      return "rgba(255,179,186)";
  }
};
const getColumnColor = (key) => {
  switch (key) {
    case 0:
      return "black";
    default:
      return "inherit";
  }
};

const Square = ({ active, row, selected, onClick }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: active ? "10%" : "10%",
        width: 30,
        height: 30,
        border: active ? "1px solid rgb(167, 167, 167)" : "1px solid #eee",
        background: active ? "rgba(133, 65, 243, 0.9)" : "",
        background: selected ? getColor(row) : "",
      }}
      onClick={onClick}
    />
  );
};

export default Sequencer;
