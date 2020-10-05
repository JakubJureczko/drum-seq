import React, { useEffect, useState, useRef, useContext } from "react";
import Dexie from "dexie";
import { Sampler } from "tone";
import ReactDOM from "react-dom";
import "./Modal.css";
import { VolumeContext } from "../volumeContext";

const Modal = ({ isShowing, hide }) => {

  const { sounds, setSounds } = useContext(VolumeContext);

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
      setSounds()
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

  

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div className="modal-wrapper">
            <div className="modal">
              <div className="modal-header">
                <h3>Upload samples:</h3>
                <span onClick={hide}></span>
                {/* <button type="button" className="modal-close-button" data-dismiss="modal"  >
                
              </button> */}
              </div>
              <div className="modalbtn">
                <button>
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => getFile(e.target.files)}
                  />
                  E
                </button>
                <button>
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => getFile(e.target.files)}
                  />
                  R
                </button>
                <button>
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => getFile(e.target.files)}
                  />
                  T
                </button>
                <button>
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => getFile(e.target.files)}
                  />
                  U
                </button>
                <button>
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => getFile(e.target.files)}
                  />
                  I
                </button>
                <button>
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => getFile(e.target.files)}
                  />
                  O
                </button>
                <button>
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => getFile(e.target.files)}
                  />
                  D
                </button>
                <button>
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => getFile(e.target.files)}
                  />
                  F
                </button>
                <button>
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => getFile(e.target.files)}
                  />
                  G
                </button>
                <button>
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => getFile(e.target.files)}
                  />
                  J
                </button>
                <button>
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => getFile(e.target.files)}
                  />
                  K
                </button>
                <button>
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => getFile(e.target.files)}
                  />
                  L
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default Modal;
