import { useState } from "react";
import { calculateWinner } from "../services/functions";
import Square from "./Square";
import { PlayerStep } from "../objects/PlayerStep";

export default function Board({ xIsNext, isInHistory, squares, onPlay }) {
  const [highlightedSquares, setHighlightedSquares] = useState([]);
  const playerO = "O";
  const playerX = "X";

  function handleSquareClick(i, row, column, positionNumber) {
    if (isInHistory) {
      return;
    }

    if (squares[i] !== null || calculateWinner(squares) !== null) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? playerX : playerO;

    //OOP preparation
    const playerSymbol = xIsNext ? playerX : playerO;
    const currentStep = new PlayerStep(
      playerSymbol,
      row,
      column,
      positionNumber
    );

    const winnerResult = calculateWinner(nextSquares);
    setHighlightedSquares(
      winnerResult !== null ? winnerResult.winnerLines : []
    );

    onPlay(nextSquares, currentStep);
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
    const row = rowIndex + 1;
    return (
      <div key={rowIndex} className="board-row">
        {[0, 1, 2].map((columnIndex) => {
          const index = start + columnIndex;
          const positionNumber = index;
          const column = columnIndex + 1;

          return (
            <Square
              key={index}
              value={squares[index]}
              isDraw={!squares.includes(null) && winner === null}
              isHighlighted={highlightedSquares.includes(index) && !isInHistory}
              onSquareClick={() =>
                handleSquareClick(index, row, column, positionNumber)
              }
            />
          );
        })}
      </div>
    );
  });

  return (
    <>
      <h1 className="mb-2">Match details TODO</h1>
      <h2 className="mb-4">{status}</h2>
      {rowsToDisplay}
    </>
  );
}
