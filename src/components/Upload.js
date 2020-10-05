import React, { useEffect, useState, useRef } from "react";
import Dexie from "dexie";
import {Sampler} from "tone"

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
  const [postTitle, setTitle] = useState("");
  const [postContent, setContent] = useState("");
  const [postFile, setFile] = useState("");
  const [posts, setPosts] = useState("");

  //read the file and decode it
  const getFile = (e) => {
    console.log(e);

    let reader = new FileReader();
    reader.readAsDataURL(e[0]);
    reader.onload = (e) => {
      setFile(reader.result);
    };
  };

  const deletePost = async (id) => {
    console.log(id);
    db.posts.delete(id);
    let allPosts = await db.posts.toArray();
    //set the posts
    setPosts(allPosts);
  };

  //submit
  const getPostInfo = (e) => {
    e.preventDefault();
    if ( postFile !== "") {
      let post = {
        title: postFile,
        content: postFile,
        file: postFile,
      };

      db.posts.add(post).then(async () => {
        //retrieve all posts inside the database
        let allPosts = await db.posts.toArray();
        //set the posts
        setPosts(allPosts);
      });
    }
  };
  const [isLoaded, setLoaded] = useState(false);
  const sampler = useRef(null);
  
  // const [currentSampler, setCurrentSampler] = useState();
console.log(postFile)
  useEffect(() => {
    sampler.current = new Sampler( 
      
      {A1: postFile},
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
      setPosts(allPosts);
    };
    getPosts();
  }, []);

  let postData;

  if (posts.length > 0) {
    postData = (
      <div className="postsContainer">
        {posts.map((post) => {
          return (
            <div className="post" key={post.title}>
              
              <audio src={post.file} controls></audio>
              <button className="delete" onClick={() => deletePost(post.title)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    );
  } else {
    postData = (
      <div className="message">
        <p>There are no posts to show</p>
      </div>
    );
  }
console.log(postFile)
  return (
    <React.Fragment>
      <form onSubmit={getPostInfo}>
        
        <div className="control">
          <label htmlFor="cover" className="cover">
            Choose a file
          </label>
          <input
            type="file"
            
            name="file"
            onChange={(e) => getFile(e.target.files)}
          />
        </div>

        <input type="submit" value="Submit" />
      </form>
     <button onClick={() => handleClick("A1")}></button>

      {postData}
    </React.Fragment>
  );
}
export default Upload;
