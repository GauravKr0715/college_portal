import React from 'react';
import loadingGIF from '../../Animated.gif';

const Loader = () => {

  return <img src={loadingGIF} style={{
    width: 'auto',
  }} className="loader" alt="Loading..." />

}

export default Loader;