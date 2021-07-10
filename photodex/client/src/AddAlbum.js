import { useState } from "react";

const AddAlbum = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const album = { title, description };

    fetch('/api/post/newAlbum', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(album)
    }).then(() => {
      console.log('album created');
    })
  }

  return (
    <div className="new-album">
      <h2>Add a New Album</h2>
      <form onSubmit={handleSubmit}>
        <label>Album title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button>Add Album</button>
      </form>
    </div>
  );
}
 
export default AddAlbum;