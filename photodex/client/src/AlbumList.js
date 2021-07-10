import useFetch from './useFetch';
import Login from './Login';

//add links later

const AlbumList = () => {
  const { data: albums, isPending, error } = useFetch('/api/user/albums');

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
      <h1>My Albums</h1>
      {error && <div>{ error }</div>}
      {isPending && <div>Loading . . .</div>}
      {albums && albums.map(album => (
        <div className="album-link" key={album._id} >
            <h3>{ album.name }</h3>
            <p>{ album.description }</p>
        </div>
      ))}
    </div>
  );
}
 
export default AlbumList;