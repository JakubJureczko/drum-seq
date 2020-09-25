import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import * as Tone from "tone";
import ReactAudioPlayer from "react-audio-player";

import "./Recorder.css";

import recon from "../assets/images/recon.svg";
import recoff from "../assets/images/recoff.svg";

const Recorder = () => {
  const [isRec, setIsRec] = useState(false);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      handleKeyRecord(e.code);
    });
  }, []);

  useEffect(() => {
    const recorder = new Tone.Recorder();
    setRecorder(recorder);
    Tone.Master.connect(recorder);
  }, []);

  const toggleRec = () => {
    setIsRec((prev) => !prev);
  };

  useEffect(() => {
    if (isRec === true) {
      recorder.start();
    } else {
      stopRecording();
    }
  }, [isRec]);


  function handleStart() {
    setIsRec((previsRec) => !previsRec);
    //setSelectSpeaker(!playState ? speaker.speakerPlay : speaker.speakerStop)
  }

  function handleKeyRecord(keyCode) {
    if (keyCode === "ShiftLeft") {
     toggleRec();
    }
  }
 

  async function stopRecording() {
    if (!recorder) return;
    const recording = await recorder.stop();
    const url = URL.createObjectURL(recording);
    const anchor = document.createElement("a");
    anchor.download = "beat.wav";
    anchor.href = url;
    anchor.click()
    
  }
  /*recorder.start();

  setTimeout(async () => {
    const recording = await recorder.stop();
    const url = URL.createObjectURL(recording);
    const anchor = document.createElement("a");
    anchor.download = "beat.wav";
    anchor.href = url;
    anchor.click();
  }, 10000);
*/
  //   document.body.appendChild(anchor);
  // anchor.click();
  // document.body.removeChild(anchor);

  return (
    <div className="recordbtn">
      <div className="start">
        <button onMouseDown={toggleRec}>
          <img src={isRec ? recon : recoff} alt="record" />
        </button>
      </div>
      <div className="download">
        <a href="" target="_blank" download>
          <button ></button>
        </a>
      </div>
    </div>
  );
};

export default Recorder;
