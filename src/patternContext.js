import React, {createContext, useState, useEffect} from "react"

const initialPattern = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];


export const PatternContext = createContext({});

const PatternContextProvider = ({ children }) => {
  const [pattern, setPattern] = useState(initialPattern);

  const updatePattern = ({ x, y, value }) => {
    const patternCopy = [...pattern];
    patternCopy[y][x] = +!value;
    setPattern(patternCopy);
  }

  const clearPattern = () => setPattern(initialPattern)

  return (
    <PatternContext.Provider value={{ pattern, updatePattern, clearPattern }}>
      {children}
    </PatternContext.Provider>
  );
};

export default PatternContextProvider;
