import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UnsplashImage } from './randomImages/UnsplashImage';
import { Loader } from './randomImages/Loader'
import InfiniteScroll from 'react-infinite-scroll-component';

import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

// Style
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
  }
`;

const WrapperImages = styled.section`
  max-width: 70rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 300px;
`;

const Landing = () => {
    const [images, setImages] = useState([]);
    const [loaded, setIsLoaded] = useState(false);

    useEffect(() => {
      fetchImages();
    }, [])
  
    const fetchImages = (count = 10) => {
      const apiRoot = "https://api.unsplash.com";
  
      axios
      .get(`${apiRoot}/photos/random?client_id=eoIrLI-XqDn3kXeD8oJJ5Tx_G0-47_P763ZGxfyEGqs&count=${count}`)
      .then(res => {
        console.log(res.data);
        setImages([...images, ...res.data]);
      });
  };

    return (
        <div className="Landing">
            <style>{ 'body {background-color: #5e90be'}</style>
            <img id = "x" src= "example_images/logo.png"
                alt=""></img>
            <h5>Welcome to Photodex</h5>
            <div className="image-grid">
              {images.map(image => (
                    <UnsplashImage
                      url={image.urls.regular}
                      key={image.id}
                      alt={image.description}
                    />
              ))}
            </div>
        </div>
    )
}
export default Landing;
