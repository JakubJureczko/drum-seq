import React, {useContext} from 'react';

import "./Clear.css";
import {PatternContext} from "../patternContext"

const Clear = () => {

  const {initialPattern, setPattern, pattern} = useContext(PatternContext)
  console.log(initialPattern)
  console.log(pattern)

  return (
    <div className="clear">
      <button onClick={() => {
        setPattern(initialPattern);
        console.log("HIPHOP")
        
        }} className="clearbutton"></button>
    </div>
  )
}

export default Clear;