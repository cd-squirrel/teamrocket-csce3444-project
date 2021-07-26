//import { useState, useEffect, useRef } from "react";

const Images = (props) => {
  const id = props.id;
  /*var [image, setImage] = useState({});

  const fetchImageRef = useRef(null);

  if(!fetchImageRef.current) {
      fetchImageRef.current = () => {
        async function fetchImage() {
            const fetchImage = await fetch(`/api/post/${id}`);
            image = await fetchImage.json();
            console.log(image);
        }
        fetchImage();
      };
  }

  useEffect( () => fetchImageRef.current(), []);*/

  

  return (
    <div className='image-section'>
        {id ? (
          <>
            
            <a className='link' href={`/api/post/${id}`} target='_blank'>
            <img
              className='image'
              src={`/api/post/${id}`}
              alt=''
            />
            </a>
          </>
        ) : (
          <p>no image</p>
        )}
      </div>
  );
};

export default Images;