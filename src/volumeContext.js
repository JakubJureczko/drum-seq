import React, { createContext, useState, useRef } from "react";
import { triggers, defaultSounds } from "./components/triggers";

export const VolumeContext = createContext({});

const VolumeContextProvider = ({ children }) => {
  const [vol, setVol] = useState(0);
  const [sounds, setSounds] = useState(defaultSounds);

  return (
    <VolumeContext.Provider value={{ vol, setVol, sounds, setSounds }}>
      {children}
    </VolumeContext.Provider>
  );
};

export default VolumeContextProvider;
