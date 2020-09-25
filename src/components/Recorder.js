import { render } from "@testing-library/react";
import React, { useState } from "react";
import * as Tone from "tone";
import ReactAudioPlayer from "react-audio-player";

import "./Recorder.css"

import recon from "../assets/images/recon.svg";
import recoff from "../assets/images/recoff.svg";

const Recorder = () => {
  const [rec, setRec] = useState(false);

  // const recorder = new Tone.Recorder();
  // Tone.Master.connect(recorder);

  // recorder.start();

  // setTimeout(async () => {
  //   const recording = await recorder.stop();
  //   const url = URL.createObjectURL(recording);
  //   const anchor = document.createElement("a");
  //   anchor.download = "beat.wav";
  //   anchor.href = url;
  //   anchor.click();
  // }, 10000);

  //   document.body.appendChild(anchor);
  // anchor.click();
  // document.body.removeChild(anchor);

  return (
    <div className="recordbtn">
      <div className="start">
        <button onMouseDown={() => setRec(!rec)}>
          <img
            src={rec ? recon : recoff}
            alt="record"
           
          />
        </button>
      </div>
      <div className="download">
      <a href="" target="_blank" download>
        <button></button>
      </a>
      </div>
    </div>
  );
};

export default Recorder;
