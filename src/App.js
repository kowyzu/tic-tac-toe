import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [isAscending, setIsAscending] = useState(true);
  const [isInHistory, setIsInHistory] = useState(false);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove, moves) {
    setCurrentMove(nextMove);

    if (nextMove !== moves.length - 1) {
      setIsInHistory(true);
    } else {
      setIsInHistory(false);
    }
  }

  function handleSort() {
    setIsAscending(!isAscending);
  }

  const moves = history.map((squares, move) => {
    let description;

    if (move === currentMove) {
      description = "You are at move # " + move;
    } else if (move > 0) {
      description = "Go to move # " + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move, moves)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          isInHistory={isInHistory}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game">
        <div className="game-info">
          <button onClick={handleSort}>
            Reorder to: {isAscending ? "Descending" : "Ascending"}
          </button>
          <ul>{isAscending ? moves : moves.reverse()}</ul>
        </div>
      </div>
    </div>
  );
}
