import React, {useContext} from 'react';

import "./Clear.css";
import {PatternContext} from "../patternContext"

const Clear = () => {

  const { clearPattern } = useContext(PatternContext)

  return (
    <div className="clear">
      <button onClick={clearPattern} className="clearbutton" />
    </div>
  )
}

export default Clear;