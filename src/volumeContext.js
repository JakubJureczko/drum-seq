import React, {createContext, useState, useRef,} from "react"
import triggers from "./components/triggers"


export const VolumeContext = createContext({});

const VolumeContextProvider = ({ children }) => {
  const [vol, setVol] = useState(0);

  const sounds = triggers.reduce((acc, { sound, name }) => {
    return {
      ...acc,
      [name]: sound,
    };
  }, {});
    

return (
  <VolumeContext.Provider value={{vol, setVol, sounds}}>
    {children}
  </VolumeContext.Provider>
)

}

export default VolumeContextProvider;