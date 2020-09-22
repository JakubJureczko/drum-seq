import React, {  useState, useEffect, useContext } from "react";
import * as Tone from "tone";
import "./Seq.css";
import SoundName from './SoundName';
import Mute from "./Mute"
import {PatternContext} from "../patternContext"

const Sequencer = () => {
  const { pattern, updatePattern, activeColumn } = useContext(PatternContext)

  // Update pattern by making a copy and inverting the value
  
  return (
    <div>
      <div className="backseq">
        <SoundName />
        <Mute />
        <div className="seqBorder">
          {pattern.map((row, y) => (
            <div className="outter">
              <div
                key={y}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                {row.map((value, x) => (
                  <Square
                    col={x}
                    row={y}
                    active={activeColumn === x}
                    selected={value}
                    onClick={() => updatePattern({ x, y, value })}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
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
      return "rgba(133, 65, 243, 0.2)";
    case 4:
      return "rgba(133, 65, 243, 0.2)";
    case 8:
      return "rgba(133, 65, 243, 0.2)";
    case 12:
      return "rgba(133, 65, 243, 0.2)";
    default:
      return "";
  }
};
const Square = ({ active, row, selected, onClick, col }) => {
  return (
    <div
      className="square"
      style={{
        borderRadius: active ? "10%" : "10%",
        border: active ? "2px solid rgb(167, 167, 167)" : "2px solid rgba(167, 167, 167, 0.4)", //`2px solid ${getColumnColor(key)}`,   //"2px solid #eee"
        background: selected ? getColor(row) : getColumnColor(col),
      }}
      onClick={onClick}
    />
  );
};

// Tone.Transport.swing = 0.5;
// Tone.Transport.swingSubdivision = '16n';

export default Sequencer;
