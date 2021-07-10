//add links later

const AlbumList = ({ albums }) => {
  state = {albums: []};

  fetch('/api/user/albums')
    .then(res => res.json())
    .then(albums => this.setState({ albums }));

  return (
    <div className="album-list">
      {albums.map(album => (
        <div className="album-link" key={album._id} >
            <h2>{ album.title }</h2>
            <p>{ album.description }</p>
        </div>
      ))}
    </div>
  );
}
 
export default AlbumList;