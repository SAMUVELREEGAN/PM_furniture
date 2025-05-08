import React from 'react';
import './Loader.css';
import loadingGif from  '../assets/load.gif'

const Loader = () => (
  <div className="loader-wrapper">
    <img src={loadingGif} alt="Loading..." className="loader-gif" />
  </div>
);

export default Loader;
