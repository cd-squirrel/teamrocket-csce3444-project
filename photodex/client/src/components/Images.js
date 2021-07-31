const Images = (props) => {
  const id = props.id;
  

  return (
    <div className='image-section'>
        {id ? (
          <>
            <a className='link' href={`/api/image/${id}`} target='_blank' rel='noreferrer'>
            <img
              className='image card'
              src={`/api/image/${id}`}
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