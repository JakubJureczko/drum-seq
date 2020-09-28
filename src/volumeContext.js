import React, {createContext, useState, useRef,} from "react"



export const VolumeContext = createContext({});

const VolumeContextProvider = ({ children }) => {
  const [vol, setVol] = useState(0);

  
    

return (
  <VolumeContext.Provider value={{vol, setVol}}>
    {children}
  </VolumeContext.Provider>
)

}

export default VolumeContextProvider;