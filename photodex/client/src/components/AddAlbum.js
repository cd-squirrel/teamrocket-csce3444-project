import { useState } from "react";
import useFetch from "../useFetch";
import Login from "../pages/Login";

const AddAlbum = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  var loggedIn = true;
  var { data: albums, isPending, error } = useFetch('/api/user/albums');
  console.log(albums);
  if(albums === "Please log in") {
    loggedIn = false;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const album = { name, description };

    try {
      await fetch('/api/post/newAlbum', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(album)
      });      
    } catch(err) {
      console.log(err);
    }

    setName('');
    setDescription('');

    window.location.reload();
  };

  

  if (loggedIn) {
    return (
      <div className="uploads">
        <div className="new-album">
          <h2>Add a New Album</h2>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              required 
              placeholder="Album Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              required
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button>Add Album</button>
         </form>
       </div> 
       <div className="image-upload">
         <h1>Image Upload</h1>
         {error && <div>{ error }</div>}
         {isPending && <div>Loading . . .</div>}
         {albums && 
            <form>
              <label>Choose album</label>
              <select>
                {albums.map( (album) => (
                  <option>{album.name}</option>
                ))}
              </select>
            </form>}
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
 
export default AddAlbum;