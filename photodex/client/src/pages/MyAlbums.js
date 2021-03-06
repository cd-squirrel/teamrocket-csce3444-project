import React from 'react';
import useFetch from '../useFetch';
import Login from '../pages/Login';
import { Link } from 'react-router-dom';

const MyAlbums = () => {

  const { data: albums, isPending, error } = useFetch('/api/user/albums/0');

  console.log(albums);

  if(albums === "Please log in") {
    
    return (
      <div>
        <Login />
      </div>
    );
  }
  
  return (
     <div className="album-list">
      <img src="https://media.giphy.com/media/9V7qW099yYNyrgagqF/giphy.gif" id="bG" alt=''></img>


    <div className="contents" id="albums-list">
      <h1>My Albums</h1>
      {error && <div>{ error }</div>}
      {isPending && <div>Loading . . .</div>}
      <div>
      {albums && albums.map(album => (
        <h3 className="album-link" key={album._id} >
            <Link to={`/images/${album.owner}/${album._id}/${album.name}/${album.description}`}>{ album.name }</Link>
        </h3>
      ))}
      </div>
    </div>
    </div>
  );
};

export default MyAlbums;
