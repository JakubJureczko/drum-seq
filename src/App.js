import React from "react";

import styled from "styled-components";
import Sequencer from "./components/Seq";
import SampleBtn from "./components/SampleBtn"


import "./App.css";

function App() {
  
  return (
    <div className="app">
      <SampleBtn />
      <Sequencer />
    </div>
  );
}

export default App;
