import React, { useState, useEffect } from "react";
import axios from 'axios';
import useFetch from "../useFetch";
import Login from "../pages/Login";

const Upload = () => {

  //ADD ALBUM

  //album state vars
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [albumId, setAlbumId] = useState('');

  //fetching albums: to check login and for refreshing album list in image upload
  var loggedIn = true;
  var { data: albums, isPending, error } = useFetch(`/api/user/albums/0`);
  console.log(albums);
  if(albums === "Please log in") {
    loggedIn = false;
  }

  //album submit handler
  const handleAlbumSubmit = async (e) => {
    e.preventDefault();
    const album = { name, description };

    try {
      await fetch('/api/image/newAlbum', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(album)
      });      
    } catch(err) {
      console.log(err);
    }

    setName('');
    setDescription('');

    window.location.reload(); //for refreshing album options in image upload form
  };

  //IMAGE UPLOAD
  //Credit: Thomas Foydel for most of the upload code
  //github repo: ThomasFoydel/MERN-image-upload

  //image state vars
  const [file, setFile] = useState(null);
  const [inputContainsFile, setInputContainsFile] = useState(false);
  const [imageId, setImageId] = useState(null);

  //file handler
  const handleFile = (event) => {
    setFile(event.target.files[0]);
    setInputContainsFile(true);
  };
  
  //file upload handler
  const fileUploadHandler = (e) => {
  
    if (albumId === '') {
        return;
    }

    const fd = new FormData();
    fd.append('image', file, file.name);
    fd.append('albumid', albumId);

    axios
      .post(`/api/image/upload/`, fd )
      .then(({ data }) => {
        console.log('sent image to server');
        setImageId(data);
        setFile(null);
        setInputContainsFile(false);
      }).catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          const errMsg = err.response.data;
          if (errMsg) {
            console.log(errMsg);
            alert(errMsg);
          }
        } else if (err.response.status === 500) {
          console.log('db error');
          alert('db error');
        } else {
          console.log('other error: ', err);
        }
        setInputContainsFile(false);
        })
  };

  // onClick handler
  const clickHandler = () => {
    if (albumId === 'null') {
        alert('albumId is null');
    }
    if (inputContainsFile) {
      fileUploadHandler();
    }
  };

useEffect( () => {
  console.log('albumId state changed ', albumId);
}, [albumId]);

    
  
  if (loggedIn) {
    return (
       <div className="uploads" id ="upload_page">
        <div className="new-album">
        <img src="https://media.giphy.com/media/hTDRXTqrGLwMracQNl/giphy.gif" id="bG" alt=''></img>

        <div className="col">
        <div className="contents">
          <h2>Add a New Album</h2>
          <form onSubmit={handleAlbumSubmit}>
            <div className="album-name">
              <input 
                type="text" 
                required 
                placeholder="Album Title"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="album-description">
              <textarea
                required
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}>
              </textarea>
            </div>
            <button>Add Album</button>
         </form>
        </div> 
       </div>

        <div className = "col">
       <div className="contents">
       <div className="image-upload">
         <h2>Image Upload</h2>
         {error && <div>{ error }</div>}
         {isPending && <div>Loading . . .</div>}
         {albums && 
            <form>
              <div className="choose-album">
                <label>Choose album</label>
                <select 
                  value = {albumId}
                  onChange={(e) => setAlbumId(e.target.value)}>
                    <option key='' value=''>Choose album</option>
                    {albums.map( (album) => (
                      <option key={album._id} value={album._id}>{album.name}</option>
                    ))}
                </select>
              </div>
              <div className="choose-image">
                <input
                  className='file-input'
                  onChange={handleFile}
                  type='file'
                  name='file'
                  id='file'/>
                <label
                  className={`inputlabel ${file && 'file-selected'}`}
                  htmlFor='file'>
                </label>
              </div>
              <div className="submit">
                <button onClick={clickHandler}> Upload </button>
              </div>
            </form>}
         </div>
         </div>
      </div>
      </div>
     </div>
   );
  }
  else {
    return (
      <div>
      <Login />
    </div>
    );
  }
}
 
export default Upload;
