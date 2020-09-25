import { render } from '@testing-library/react'
import React from "react"
import *as Tone from "tone"
import ReactAudioPlayer from 'react-audio-player';

const Recorder = () => {
  
  const recorder = new Tone.Recorder();
  Tone.Master.connect(recorder);
 
  recorder.start();
 
 
  
  setTimeout(async () => {  
    const recording = await recorder.stop();
    const url = URL.createObjectURL(recording);
    const anchor = document.createElement("a");
    anchor.download = "beat.wav";
    anchor.href = url;
    anchor.click();
  }, 10000); 

//   document.body.appendChild(anchor);
// anchor.click();
// document.body.removeChild(anchor);

  return(
    <div>
   <a href={recorder} target="_blank"  download>
   <button>
      
      Download File
   </button>
</a> 
    </div>
  )

  
}

export default Recorder;