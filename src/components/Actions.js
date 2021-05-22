import React, { useCallback, useState, useEffect } from "react";
import * as Tone from "tone";

import "./Actions.css";

import speakerStop from "../assets/images/speakermoze.svg";
import speakerPlay from "../assets/images/speaker.svg";

import {
  faRecordVinyl,
  faCompactDisc,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Actions = () => {
  const [playState, setPlayState] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      handleKeyPressStart(e.code);
    });
  }, []);

  function handleStart() {
    setPlayState((prevPlayState) => !prevPlayState);
    //setSelectSpeaker(!playState ? speaker.speakerPlay : speaker.speakerStop)
  }

  function handleKeyPressStart(keyCode) {
    if (keyCode === "Space") {
      toggle();
      handleStart();
    }
  }

  // Toggle playing / stopped
  const toggle = useCallback(() => {
    Tone.Transport.toggle();
    Tone.start();
  }, []);

  return (
    <div className="amplifiers">
      <div className="turntable">
        <img src={playState ? speakerPlay : speakerStop} alt="speaker" />
        <button
          className="startBtn"
          onMouseDown={() => {
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
        <img src={playState ? speakerPlay : speakerStop} alt="speaker2" />
      </div>
    </div>
  );
};

export default Actions;
