import React from 'react';

const Rematch = (props) => {
  const { isGameEnded, onRematchClick } = props;

  return (<>
    {isGameEnded
      ? <button className='f2 rematchButton' onClick={onRematchClick} >Rematch</button>
      : <></>
    }
  </>);
}

export default Rematch;
