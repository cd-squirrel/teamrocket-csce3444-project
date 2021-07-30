import useFetch from '../useFetch';
import { useRouteMatch } from 'react-router';
import Images from './Images';

const AlbumImages = () => {

  const match = useRouteMatch('/images/:userId/:albumId');
  const userId = match.params.userId;
  const albumId = match.params.albumId;
  const albumName = match.params.title;
  console.log('owner: ', match.params.userId);
  console.log('album: ', match.params.albumId);
  const { data: imageInfo, isPending, error } = useFetch(`/api/user/images/${userId}/${albumId}`);

  console.log(imageInfo);
  //call component to get images while looping through imageInfo

  

  return (
    <div>
      {error && <div>{ error }</div>}
      {isPending && <div>Loading . . .</div>}
      <div className='images'>
      <h3>{ albumName }</h3>
        {imageInfo && imageInfo.map(image => (
          <div key={image.fileId}>
            <Images id={image.fileId}/> 
          </div>
        ))}
      </div>
    </div>
    
  );
}
 
export default AlbumImages;