import React, {createContext, useState, useEffect} from "react"
import * as Tone from "tone";
import { equals } from 'ramda';

import D1 from "./assets/drums/bd1.mp3";
import D2 from "./assets/drums/bd2.mp3";
import D3 from "./assets/drums/sd1.mp3";
import D4 from "./assets/drums/ch1.mp3";
import D5 from "./assets/drums/ch2.mp3";
import D6 from "./assets/drums/ch2.mp3";
import D7 from "./assets/drums/oh.mp3";

const initialPattern = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const drums = ["D1", "D2", "D3", "D4", "D5", "D6", "D7"];


// Tone.Transport.state

const seq = new Tone.Sampler({
  D1,
  D2,
  D3,
  D4,
  D5,
  D6,
  D7,
}).toDestination();

export const PatternContext = createContext({});

const PatternContextProvider = ({ children }) => {
  const [activeColumn, setColumn] = useState(0);
  const [pattern, setPattern] = useState(initialPattern);
  const [loop, setLoop] = useState();
  const [playState, setPlayState] = useState(false);

  useEffect(() => {
    if (equals(pattern, initialPattern)) {
      console.log('equals')
      setLoop()
    } else {
      setNewLoop()
    }
  }, [pattern])

  useEffect(() => {
    if (loop) loop.start(0)
  }, [loop])

  const setNewLoop = () => {
    setLoop(new Tone.Sequence(
      (time, col) => {
        // Update active column for animation
        setColumn(col);

        // Loop current pattern
        pattern.forEach((row, noteIndex) => {
          // If active
          if (row[col]) {
            console.log('play')
            // Play based on which row
            seq.triggerAttackRelease(drums[noteIndex], "8n", time);
          }
        });
      },
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      "16n"
    ))    
  }

  const updatePattern = ({ x, y, value }) => {
    setPattern(prevPattern => {
      
      return prevPattern.map((item, index) => {
        if (index !== y) return item
        return item.map((itemx, indexx) => {
          if (indexx !== x) return itemx
          return value ? 0 : 1
        })
      })
    })
  }


  const clearPattern = () => {
    const row =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    setPattern(pattern.map(() => row))
    setColumn(0)
    loop.stop()
    loop.dispose()
    setLoop()
    setPlayState(false)
  }

  return (
    <PatternContext.Provider value={{
      pattern,
      updatePattern,
      clearPattern,
      loop,
      activeColumn,
      playState,
      setPlayState
    }}>
      {children}
    </PatternContext.Provider>
  );
};

export default PatternContextProvider;
