import React, {useState} from 'react'
import { Song, Track, Instrument } from 'reactronica';
// Simplified Drum Pads

const Pady = () => {
  const [notes, setNotes] = useState(null);
  return (
    <>
      <button
        onMouseDown={() => setNotes([{ name: 'C3' }])}
        onMouseUp={() => setNotes(null)}
      >
        Kick
      </button>
    
      <Song>
        <Track>
          <Instrument
            type="sampler"
            notes={notes}
            samples={{
              C3: '/assets/bd1.mp3',
              
            }}
            onLoad={() => {
              // Runs when samples are loaded
            }}
          />
        </Track>
      </Song>
    </>
  );
};

export default Pady;