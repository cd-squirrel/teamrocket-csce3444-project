import React  from 'react';


const Images = (props) => {
const id = props.id;
  

  return (
    <div classNameName='image-section'>
        {id ? (
          // <>
            <a classNameName='link' href={`/api/image/${id}`} target='_blank' rel='noreferrer'>
            <img
              classNameName='image card'
              src={`/api/image/${id}`}
              alt=''
            />
            </a>
          // </>
        ) : (
          <p>no image</p>
        )}
      </div>
  );
};

export default Images;