import React, { useEffect, useState, useRef } from "react";
import Dexie from "dexie";
import { Sampler } from "tone";

function Upload() {
  //set the database
  const db = new Dexie("ReactDexie");
  //create the database store
  db.version(1).stores({
    posts: "title, content, file",
  });
  db.open().catch((err) => {
    console.log(err.stack || err);
  });

  //set the state and property

  const [postFile, setFile] = useState("");


  //read the file and decode it
  const getFile = (e) => {
    console.log(e);

    let reader = new FileReader();
    reader.readAsDataURL(e[0]);
    reader.onload = (e) => {
      setFile(reader.result);
    };
  };




  const [isLoaded, setLoaded] = useState(false);
  const sampler = useRef(null);

  // const [currentSampler, setCurrentSampler] = useState();
  console.log(postFile);
  useEffect(() => {
    sampler.current = new Sampler(
      { A1: postFile },
      {
        onload: () => {
          setLoaded(true);
        },
      }
    ).toDestination();
  }, [postFile]);
  // let reverb = new Tone.Reverb(0.8).connect(Tone.Master);
  const handleClick = (sound) => sampler.current.triggerAttack(sound);

  useEffect(() => {
    //get all posts from the database
    const getPosts = async () => {
      let allPosts = await db.posts.toArray();
      
    };
    getPosts();
  }, []);

  
  return (
    <React.Fragment>
      <div>
        <div>
          <input
            type="file"
            name="file"
            onChange={(e) => getFile(e.target.files)}
          />
        </div>
        <button onClick={() => handleClick("A1")}></button>
      </div>
    </React.Fragment>
  );
}
export default Upload;
