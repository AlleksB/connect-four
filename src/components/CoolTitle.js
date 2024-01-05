import React from 'react';
import Tilt from 'react-parallax-tilt';

const CoolTitle = () => {
  return (<>
    <Tilt className="tiltTitle" scale={1.5}>
      <h1 className="coolTitle">Connect 4!</h1>
    </Tilt>
  </>);
}

export default CoolTitle;
