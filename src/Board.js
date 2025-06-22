import { useState } from "react";
import { calculateWinner } from "./functions";
import Square from "./Square";

export default function Board({ xIsNext, isInHistory, squares, onPlay }) {
  const [highlightedSquares, setHighlightedSquares] = useState([]);

  function handleClick(i) {
    if (squares[i] !== null || calculateWinner(squares) !== null) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    const winnerResult = calculateWinner(nextSquares);
    if (winnerResult !== null) {
      setHighlightedSquares(winnerResult.winnerLines);
    } else {
      setHighlightedSquares([]);
    }

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner !== null) {
    status = "Winner is: " + winner.winnerSquares;
  } else if (!squares.includes(null)) {
    status = "It`s a draw!";
  } else {
    status = "Next player is: " + (xIsNext ? "X" : "O");
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
              isDraw={!squares.includes(null)}
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
