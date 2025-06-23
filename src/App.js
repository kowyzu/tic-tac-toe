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
      <button
        key={move}
        type="button"
        className={[
          "list-group-item list-group-item-action",
          move === currentMove ? "disabled" : "",
        ].join(" ")}
        onClick={() => jumpTo(move, moves)}
      >
        <h4>{description}</h4>
        <small>And some small print.</small>
      </button>
    );
  });

  return (
    <>
      <div className="game row justify-content-center">
        <div className="game-board col-6">
          <Board
            xIsNext={xIsNext}
            isInHistory={isInHistory}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="game-info col-4">
          <button className="btn btn-info mb-3" onClick={handleSort}>
            Reorder to: {isAscending ? "Descending" : "Ascending"}
          </button>
          <div className="list-group">
            {isAscending ? moves : moves.reverse()}
          </div>
        </div>
      </div>
      <div className="row justify-content-center text-center mt-5">
        <h1>Score Table TODO</h1>
      </div>
    </>
  );
}
