import React from "react";

import styled from "styled-components";
import Sequencer from "./components/Seq";
import SampleBtn from "./components/SampleBtn";
import Actions from "./components/Actions";
import SetBpm from "./components/SetBpm";
import SetVol from "./components/SetVol";
import Swing from "./components/Swing";

import Recorder from "./components/Recorder";

import "./App.css";
import VolumeContextProvider from "./volumeContext";

function App() {
  return (
    <div className="app">
      <VolumeContextProvider>
        <SampleBtn />
        <Sequencer />
        <Actions />
        <div>
          <div className="mixer">
            <div className="volBpmBtn">
              <SetBpm />
              <SetVol />
              <Swing />
              <Recorder />
            </div>
          </div>
        </div>
      </VolumeContextProvider>
    </div>
  );
}

export default App;
