import React from 'react';

const Board = (props) => {
  const {
    linCount,
    colCount,
    onButtonClick,
    boardStatus,
    player,
    hoverActivate,
    hoverDeactivate,
    hoveredCell
  } = props;

  let cellCol = [];
  for (let i = 1; i <= linCount; i++) {
    let cellLin = [];
    for (let j = 1; j <= colCount; j++) {
      cellLin.push(<button
        className="cell"
        onClick={() => onButtonClick(i, j)}
        onMouseEnter={() => hoverActivate(i, j)}
        onMouseLeave={() => hoverDeactivate()}
        style={{
          backgroundColor: boardStatus[i][j] === 1
            ? '#FF0000'
            : boardStatus[i][j] === 2
            ? '#FFFF00'
            : boardStatus[i][j] === 3
            ? '#32CD32'
            : '#FFFFFF',
          animation: boardStatus[i][j] === 3 && player === -1
            ? 'blinkingBackgroundRed 1s infinite'
            : boardStatus[i][j] === 3 && player === -2
            ? 'blinkingBackgroundYellow 1s infinite'
            : '',
          borderRadius: hoveredCell[0] === i && hoveredCell[1] === j
            ? '15px'
            : ''
        }}
      ></button>);
    }
    cellCol.push(<div>{cellLin}</div>);
  }

  return (
    <div
      className="board"
      style={{width: ((colCount * 70 + 50).toString() + 'px')}}
    >
      {cellCol}
    </div>
  );
}

export default Board;
