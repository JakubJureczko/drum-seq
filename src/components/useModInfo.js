import { useState } from 'react';


const useModInfo = () => {
  const [modOn, setModOn] = useState(false);

  function toggler() {
    setModOn(!modOn);
  }

  return {
    modOn,
    toggler,
  }
};

export default useModInfo;