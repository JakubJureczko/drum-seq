import React, {
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import classnames from "classnames";
import { Sampler } from "tone";
import "./SampleBtn.css";
import { VolumeContext } from "../volumeContext";
import ModInfo from "./ModInfo";
import useModInfo from "./useModInfo";
import * as Tone from "tone";
import { triggers, defaultSounds } from "./triggers";

const validKeys = triggers.map(({ keyCode }) => keyCode);

function SampleBtn() {
  const [isLoaded, setLoaded] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const [vol, setVol] = useState(0);
  const { sounds } = useContext(VolumeContext);
  const sampler = useRef(null);

  const { modOn, toggler } = useModInfo();

  useEffect(() => {
    sampler.current = new Sampler(sounds, {
      onload: () => {
        setLoaded(true);
      },
    }).toDestination();
  }, [sounds]);

  //const rev = new Tone.Reverb(1).toDestination();
  //const distortion = new Tone.Distortion(0.6).toDestination();
  //.connect(distortion, rev)

  //const feedbackDelay = new Tone.FeedbackDelay(0.1, 0.2).toDestination();

  const play = (sound) => {
    console.log("playing");
    sampler.current.releaseAll();
    setActiveButton(sound);
    sampler.current.triggerAttack(sound);
  };

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      handleKeyPress(e.code);
    });

    document.addEventListener("keyup", (e) => {
      setActiveButton("");
    });
  }, []);

  useEffect(() => {
    sampler.current.volume.value = vol;
  }, [vol]);

  function handleKeyPress(keyCode) {
    if (validKeys.indexOf(keyCode) === -1) return;
    const soundName = triggers.find((trigger) => keyCode === trigger.keyCode)
      .name;
    play(soundName);
  }

  const volume = (event) => {
    setVol(event.target.value);
  };

  return (
    <div className="samplebtn">
      <div className="btnContainer">
        <div className="btnlogo">
          <button className="btn2">
            <input
              onChange={volume}
              value={vol}
              id="volM"
              type="range"
              name="vol"
              min={-30}
              max={6}
              step="1"
            />
            <div className="infobtn">
              <button onMouseDown={toggler}></button>
              <ModInfo isShowing={modOn} hide={toggler} />
            </div>
          </button>
        </div>
        <div classnames="btnsample">
          {triggers.map(({ name, displayName }) => (
            <button
              className={classnames(
                "btn",
                activeButton === name ? "active" : ""
              )}
              disabled={!isLoaded}
              onMouseDown={() => play(name)}
              onMouseUp={() => setTimeout(setActiveButton(""), 500)}
            >
              {displayName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SampleBtn;
