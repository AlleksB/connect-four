import React, { useState } from 'react';
import CoolTitle from '../components/CoolTitle';
import Board from '../components/Board';
import BoardSize from '../components/BoardSize';
import GameStatus from '../components/GameStatus';
import Rematch from '../components/Rematch';
import './App.css';

const MAX_ROWS = 9;
const MAX_COLUMNS = 26;
const DRAW = -1;

function App() {
  const [boardLines, setBoardLines] = useState(6);
  const [boardColumns, setBoardColumns] = useState(7);
  const [cellStatus, setCellStatus] = useState(initialStatus(boardLines, boardColumns));
  const [player, setPlayer] = useState(1);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [hovered, setHovered] = useState([0, 0]);

  const onLinChange = (event) => {
    const newLines = event.target.value;
    setBoardLines(newLines);
    setCellStatus(initialStatus(newLines, boardColumns));
    setPlayer(1);
    setIsGameEnded(false);
  }

  const onColChange = (event) => {
    const newColumns = event.target.value;
    setBoardColumns(newColumns);
    setCellStatus(initialStatus(boardLines, newColumns));
    setPlayer(1);
    setIsGameEnded(false);
  }

  const onCellClickHandler = (lin, col) => {
    if (isGameEnded)
      return;

    let m = [];
    for (let i = 0; i <= boardLines; i++)
      m[i] = cellStatus[i].slice();
    let currentPlayer = player;

    let bottomCellLin = 0;
    for (let i = 1; i <= boardLines; i++) {
      if (m[i][col] === 0)
        bottomCellLin = i;
    }

    if (bottomCellLin) {
      m[bottomCellLin][col] = player;
      setCellStatus(m);
      setPlayer(3 - player);
      setHovered([0, 0]);
    }

    let endBoard = endGame(m, boardLines, boardColumns, currentPlayer);
    if (endBoard === -1) {
      setPlayer(0);
      setIsGameEnded(true);
      setHovered([0, 0]);
    }
    else if (endBoard) {
      setCellStatus(endBoard);
      setPlayer(-currentPlayer);
      setIsGameEnded(true);
      setHovered([0, 0]);
    }
  }

  const onRematchClick = () => {
    setCellStatus(initialStatus(boardLines, boardColumns));
    setPlayer(1);
    setIsGameEnded(false);
  }

  const hoverActivate = (lin, col) => {
    if (isGameEnded) {
      setHovered([0, 0]);
      return;
    }

    let m = [];
    for (let i = 0; i <= boardLines; i++)
      m[i] = cellStatus[i].slice();
    let bottomCellLin = 0;
    for (let i = 1; i <= boardLines; i++) {
      if (m[i][col] === 0)
        bottomCellLin = i;
    }
    setHovered([bottomCellLin, col]);
  }

  const hoverDeactivate = () => {
    setHovered([0, 0]);
  }

  return (<>
    <CoolTitle />
    <div className="flexBox">
      <BoardSize
        linChange={onLinChange}
        colChange={onColChange}
        boardLines={boardLines}
        boardColumns={boardColumns}
      />
      {validateNumber(boardLines, MAX_ROWS) && validateNumber(boardColumns, MAX_COLUMNS) ?
        <>
          <Rematch isGameEnded={isGameEnded} onRematchClick={onRematchClick} />
          <GameStatus currentPlayer={player} />
        </>
        : <></>
      }
    </div>
    {validateNumber(boardLines, MAX_ROWS) && validateNumber(boardColumns, MAX_COLUMNS) ?
      <Board
        linCount={boardLines}
        colCount={boardColumns}
        onButtonClick={onCellClickHandler}
        boardStatus={cellStatus}
        player={player}
        hoverActivate={hoverActivate}
        hoverDeactivate={hoverDeactivate}
        hoveredCell={hovered}
      />
      : <div className="f3 pa3 mt6 dark-red tc redBorder">Number of rows must be between 4 and {MAX_ROWS}.<br/>Number of columns must be between 4 and {MAX_COLUMNS}.</div>
    }
  </>);
}

function validateNumber(x, maxSize) {
  x = x.toString();
  if (!x.length)
    return false;
  if (x[0] === '0')
    return false;
  for (let i = 0; i < x.length; i++)
    if (!('0' <= x[i] && x[i] <= '9'))
      return false;
  if (!(4 <= x && x <= maxSize))
    return false;
  return true;
}

function initialStatus(lin, col) {
  if (!(validateNumber(lin, 10) && validateNumber(col, 26)))
    return null;
  lin = +lin;
  col = +col;
  return Array.from({ length: lin + 1 }, () => Array(col + 1).fill(0));
}

function endGame(matrix, lin, col, x) {
  let m = [];
  for (let i = 0; i <= lin; i++)
    m[i] = matrix[i].slice();

  for (let i = 1; i <= lin - 3; i++)
    for (let j = 1; j <= col; j++)
      if (m[i][j] === x && m[i + 1][j] === x && m[i + 2][j] === x && m[i + 3][j] === x) {
        m[i][j] = m[i + 1][j] = m[i + 2][j] = m[i + 3][j] = 3;
        return m;
      }

  for (let i = 1; i <= lin; i++)
    for (let j = 1; j <= col - 3; j++)
      if (m[i][j] === x && m[i][j + 1] === x && m[i][j + 2] === x && m[i][j + 3] === x) {
        m[i][j] = m[i][j + 1] = m[i][j + 2] = m[i][j + 3] = 3;
        return m;
      }

  for (let i = 1; i <= lin - 3; i++)
    for (let j = 1; j <= col - 3; j++)
      if (m[i][j] === x && m[i + 1][j + 1] === x && m[i + 2][j + 2] === x && m[i + 3][j + 3] === x) {
        m[i][j] = m[i + 1][j + 1] = m[i + 2][j + 2] = m[i + 3][j + 3] = 3;
        return m;
      }

  for (let i = 1; i <= lin - 3; i++)
    for (let j = 1; j <= col - 3; j++)
      if (m[i][j + 3] === x && m[i + 1][j + 2] === x && m[i + 2][j + 1] === x && m[i + 3][j] === x) {
        m[i][j + 3] = m[i + 1][j + 2] = m[i + 2][j + 1] = m[i + 3][j] = 3;
        return m;
      }

  for (let i = 1; i <= lin; i++)
    for (let j = 1; j <= col; j++)
      if (m[i][j] === 0)
        return null;

  return DRAW;
}

export default App;
