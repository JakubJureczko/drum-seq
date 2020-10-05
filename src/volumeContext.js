import React, {createContext, useState, useRef,} from "react"
import triggers from "./components/triggers"


const defaultSounds = triggers.reduce((acc, { sound, name }) => {
  return {
    ...acc,
    [name]: sound,
  };
}, {});
  

export const VolumeContext = createContext({});

const VolumeContextProvider = ({ children }) => {
  const [vol, setVol] = useState(0);
  const [sounds, setSounds] = useState(defaultSounds)



return (
  <VolumeContext.Provider value={{vol, setVol, sounds, setSounds}}>
    {children}
  </VolumeContext.Provider>
)

}

export default VolumeContextProvider;