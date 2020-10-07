import A1 from "../assets/samples/D1.wav";
import A2 from "../assets/samples/D2.wav";
import A3 from "../assets/samples/D3.wav";
import A4 from "../assets/samples/D4.wav";
import A5 from "../assets/samples/D5.wav";
import A6 from "../assets/samples/D6.wav";
import A7 from "../assets/samples/D7.wav";
import A8 from "../assets/samples/D8.wav";
import A9 from "../assets/samples/D9.wav";
import A10 from "../assets/samples/D10.wav";
import A11 from "../assets/samples/D11.WAV";
import A12 from "../assets/samples/D12.WAV";

const triggers = [
  {
    name: "A1",
    sound: A1,
    displayName: "E",
    keyCode: "KeyE",
  },
  {
    name: "A2",
    sound: A2,
    displayName: "R",
    keyCode: "KeyR",
  },
  {
    name: "A3",
    sound: A3,
    displayName: "T",
    keyCode: "KeyT",
  },
  {
    name: "A4",
    sound: A4,
    displayName: "U",
    keyCode: "KeyU",
  },
  {
    name: "A5",
    sound: A5,
    displayName: "I",
    keyCode: "KeyI",
  },
  {
    name: "A6",
    sound: A6,
    displayName: "O",
    keyCode: "KeyO",
  },
  {
    name: "A7",
    sound: A7,
    displayName: "D",
    keyCode: "KeyD",
  },
  {
    name: "A8",
    sound: A8,
    displayName: "F",
    keyCode: "KeyF",
  },
  {
    name: "A9",
    sound: A9,
    displayName: "G",
    keyCode: "KeyG",
  },
  {
    name: "A10",
    sound: A10,
    displayName: "J",
    keyCode: "KeyJ",
  },
  {
    name: "A11",
    sound: A11,
    displayName: "K",
    keyCode: "KeyK",
  },
  {
    name: "A12",
    sound: A12,
    displayName: "L",
    keyCode: "KeyL",
  },
];

const defaultSounds = triggers.reduce((acc, { sound, name }) => {
  return {
    ...acc,
    [name]: sound,
  };
}, {});

export { triggers, defaultSounds };
