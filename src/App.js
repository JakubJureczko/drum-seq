import React, { useState, useRef, useEffect } from "react";
import { Sampler } from "tone";
import styled from 'styled-components';
import Sequencer from './Seq'


import A1 from "./assets/S2.wav";
import A2 from "./assets/S3.wav";
import A3 from "./assets/S4.wav";
import A4 from "./assets/S5.wav";
import A5 from "./assets/S6.wav";


import './App.css'
import DrumPads from './Pady';

function App() {
  const [isLoaded, setLoaded] = useState(false);
  const sampler = useRef(null);
  const [currentSampler, setCurrentSampler] = useState()
  
  const[color, setColor] = useState('');

  const Title = styled.button`
  background-color: green;
  `;

  useEffect(() => {
    sampler.current = new Sampler(
      { A1, A2, A3, A4, A5 },
      {
        onload: () => {
          
            setLoaded(true);}
        },
      
    ).toDestination();
  }, []);

  const handleClick = () => sampler.current.triggerAttack("A1");
  
  const handleClick2 = () => {
    if(currentSampler) {
      currentSampler.stop()
    }
    setCurrentSampler(sampler.current);
    sampler.current.triggerAttack("A2")
  }
  
  const handleClick3 = () => sampler.current.triggerAttack("A3");
  
  const handleClick4 = () => sampler.current.triggerAttack("A4");
  const handleClick5 = () => sampler.current.triggerAttack("A5");
  const handleClickX = () => sampler.current.triggerAttack("");

  const changeColorsssss = (e) => {
     styled.button`
    background-color: green;
    `;
  }

  // useEffect(() =>
  //   document.addEventListener("keydown", (e) => {
  //     handleKeyPress(e.code)
     
      
  //   })

  // );
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
        handleKeyPress(e.code)
    })
    
    document.addEventListener("keyup", (e) => {
      if(currentSampler){
        currentSampler.stop()
      }
      
    });
         
       

  },[]);


  function changeColor(color) { 
    document.button.style.background = color; 
} 
  const btn = document.getElementById("btn")

function colorFunction() { 
    changeColor('yellow'); 
    btn.innerHTML = ""; 
}     
  

  function handleKeyPress(keyCode) {
    if(currentSampler){
      currentSampler.stop()
    }

    switch (keyCode) {
      case "KeyD": 
     
      handleClick()
      
        break;
      case "KeyF":
        handleClick2();
        break;
      case "KeyJ":
        handleClick4();
        break;
      case "KeyK":
        handleClick5();
        break;
      case "KeyL":
        handleClick3();
        break;
      default:
        break;
    }
  }


  return (
    <div className="app">
      <button id="btn" disabled={!isLoaded}   
        onClick={handleClick}> 
        BD/D
      </button>
     
      <button id="btn" disabled={!isLoaded} onClick={handleClick2} >
        SD/F
      </button>
      <button  id="btn" disabled={!isLoaded} onClick={handleClick4}>
        CH/J
      </button>
      <button id="btn" disabled={!isLoaded} onClick={handleClick5}>
        OH/K
      </button>
      <button id="btn" disabled={!isLoaded} onClick={handleClick3}>
        SMPL/L
      </button>
      < Sequencer />
    </div>
  );
};

export default App;
