import React, { useState } from "react";
import * as Tone from "tone"



const Pitch = () => {
const [pitch, setPitcch] = useState(0)

Tone.Transport.PitchShift = pitch

return (
  <div>
    <button onClick={setPitcch(pitch + 1)}>
  {pitch}
    </button>
  </div>
)
}


export default Pitch; 