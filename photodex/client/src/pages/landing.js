import React from "react";

const Landing = () => {

  const images = [
    // { id: 1, src: 'randomimages/img1.JPG', title: 'foo', description: 'bar' },
    { id: 2, src: 'randomimages/img2.JPG', title: 'foo', description: 'bar' },
    { id: 3, src: 'randomimages/image3.jpg', title: 'foo', description: 'bar' },
    { id: 4, src: 'randomimages/image4.jpg', title: 'foo', description: 'bar' },
    { id: 5, src: 'randomimages/image5.jpg', title: 'foo', description: 'bar' },
    { id: 6, src: 'randomimages/image6.jpg', title: 'foo', description: 'bar' },
    { id: 7, src: 'randomimages/img7.jpg', title: 'foo', description: 'bar' },
    { id: 8, src: 'randomimages/img8.jpg', title: 'foo', description: 'bar' },
    { id: 9, src: 'randomimages/img9.jpg', title: 'foo', description: 'bar' },
    { id: 10, src: 'randomimages/img10.jpg', title: 'foo', description: 'bar' },
    { id: 11, src: 'randomimages/img11.jpg', title: 'foo', description: 'bar' },
    { id: 12, src: 'randomimages/img13.jpg', title: 'foo', description: 'bar' },

  ]

  console.log(images)
  return(
    <div className="Landing">
            <style>{ 'body {background-color: #5e90be'}</style>
            <img id = "x" src= "example_images/logo.png"
                alt=""></img>
            <h5>Welcome to PhotoDex</h5>
            <div className="row">
                { images.map(({id, src, title, description}) => 
                  <div className='column' key={{id}}>
                    <img key={{id}} src={{src}} title={{title}} width='300' alt={{description}} className="img-fluid"/>
                  </div>)
                }
                {/* <img src='example_images/img002.png' className="img-fluid" alt=''/> */}
            </div>
      </div>
  )

}

export default Landing;