import React, {createContext, useState} from "react"



export const VolumeContext = createContext({});

const VolumeContextProvider = ({ children }) => {
  const [vol, setVol] = useState(0);

  useEffect(() => {
    seq.volume.value = vol;
  }, [vol]);
  

  return (
    <VolumeContext.Provider value={{ vol, setVol, seq }}>
      {children}
    </VolumeContext.Provider>
  );
};

export default VolumeContextProvider;
