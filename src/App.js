import React from "react";

import styled from "styled-components";
import Sequencer from "./components/Seq";
import SampleBtn from "./components/SampleBtn";
import Actions from "./components/Actions";
import SetBpm from "./components/SetBpm";
import SetVol from "./components/SetVol";
import Swing from "./components/Swing";
import Clear from "./components/Clear";

import PatternContextProvider from "./patternContext";

import "./App.css";

function App() {
  return (
    <PatternContextProvider>
      <div className="app">
        <SampleBtn />
        <Sequencer />
        <Actions />
        <div>
          <div className="mixer">
            <div className="volBpmBtn">
              <SetBpm />
              <SetVol />
              <Swing />
              <Clear />
            </div>
          </div>
        </div>
      </div>
    </PatternContextProvider>
  );
}

export default App;
