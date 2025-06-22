import { useState } from "react";
import { calculateWinner } from "./functions";
import Square from "./Square";

export default function Board({ xIsNext, isInHistory, squares, onPlay }) {
  const [highlightedSquares, setHighlightedSquares] = useState([]);
  const playerO = "O";
  const playerX = "X";

  function handleClick(i) {
    if (isInHistory) {
      return;
    }

    if (squares[i] !== null || calculateWinner(squares) !== null) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? playerX : playerO;

    const winnerResult = calculateWinner(nextSquares);
    setHighlightedSquares(
      winnerResult !== null ? winnerResult.winnerLines : []
    );

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner !== null) {
    status = "Winner is: " + winner.winnerSquares;
  } else if (!squares.includes(null) && winner === null) {
    status = "It`s a draw!";
  } else {
    status = "Next player is: " + (xIsNext ? playerX : playerO);
  }

  const rowsToDisplay = [0, 1, 2].map((rowIndex) => {
    const start = rowIndex * 3;
    return (
      <div key={rowIndex} className="board-row">
        {[0, 1, 2].map((colIndex) => {
          const index = start + colIndex;

          return (
            <Square
              key={index}
              value={squares[index]}
              isDraw={!squares.includes(null) && winner === null}
              isHighlighted={
                highlightedSquares.includes(index) && isInHistory !== true
              }
              onSquareClick={() => handleClick(index)}
            />
          );
        })}
      </div>
    );
  });

  return (
    <>
      <div className="status">{status}</div>
      {rowsToDisplay}
    </>
  );
}
