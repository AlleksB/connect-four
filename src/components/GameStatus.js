import React from 'react';

const GameStatus = (props) => {
  const { currentPlayer } = props;

  const message = (
    currentPlayer > 0
    ? `Player ${currentPlayer} moves!`
    : currentPlayer < 0
    ? `Player ${-currentPlayer} WINS!`
    : 'DRAW!'
  );

  return (
    <div className='f2 gameStatus' style={{
      color: Math.abs(currentPlayer) === 1
        ? '#FF0000'
        : Math.abs(currentPlayer) === 2
        ? '#FFFF00'
        : '#FFBF00',
      animation: currentPlayer <= 0
        ? 'blinkingStatus 1s infinite'
        : ''
    }}>
      <div className='enlarge'>
        {message}
      </div>
    </div>
  );
}

export default GameStatus;
