import React, { useState } from 'react';
import './index.css'; 

const initialBoard = Array(9).fill(null);

const calculateWinner = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const TicTacToeGame = () => {
  const [history, setHistory] = useState([initialBoard]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const currentBoard = history[stepNumber];

  const handleClick = i => {
    if (winner || currentBoard[i]) return;
    const newBoard = [...currentBoard];
    newBoard[i] = xIsNext ? 'X' : 'O';
    const newHistory = history.slice(0, stepNumber + 1);
    setHistory([...newHistory, newBoard]);
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  const jumpTo = step => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    setWinner(null);
  };

  const moves = history.map((_, move) => {
    const desc = move ? `回到 #${move}` : '遊戲開始';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = `贏家是: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        {[0, 1, 2].map(row => (
          <div key={row} className="board-row">
            {[0, 1, 2].map(col => (
              <button key={col} className="square" onClick={() => handleClick(row * 3 + col)}>
                {currentBoard[row * 3 + col]}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default TicTacToeGame;
