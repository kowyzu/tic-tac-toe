import { useState } from "react";
import Board from "../components/Board";
import { PlayerStep } from "../objects/PlayerStep";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // !OOP of history state => TODO
  const gameStartStep = new PlayerStep("", null, null, null);
  const [stepsHistory, setStepsHistory] = useState([gameStartStep]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  // !OOP of currentSquares
  const currentStep = stepsHistory[currentMove];
  const [isAscending, setIsAscending] = useState(true);
  const [isInHistory, setIsInHistory] = useState(false);

  function handlePlay(nextSquares, currentStep) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    //OOP

    setStepsHistory([...stepsHistory, currentStep]);
  }

  /**
   * Display chosen previous history move
   */
  function jumpTo(nextMove, moves) {
    setCurrentMove(nextMove);

    if (nextMove !== moves.length - 1) {
      setIsInHistory(true);
    } else {
      setIsInHistory(false);
    }
  }

  /**
   * Sort history moves list in descending/ascending order
   */
  function handleSort() {
    setIsAscending(!isAscending);
  }

  /**
   * Display history of game
   */
  const moves = history.map((squares, move) => {
    let description;
    let displayedStepPosition;

    if (move === currentMove) {
      description = "You are at move # " + move;
      if (move === 0) {
        displayedStepPosition = "";
        description = "You are at game start.";
      } else {
        displayedStepPosition =
          "Look at row: " +
          currentStep.rowPosition +
          " and column: " +
          currentStep.columnPosition;
      }
    } else if (move > 0) {
      description = "Look at move # " + move;
    } else {
      description = "Look at game start";
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
        {displayedStepPosition ? <small>{displayedStepPosition}</small> : ""}
      </button>
    );
  });

  /**
   * Display the whole Game section
   */
  return (
    <>
      <div className="game row justify-content-center">
        <div className="game-board col-6">
          <Board
            xIsNext={xIsNext}
            isInHistory={isInHistory}
            squares={currentSquares}
            currentStep={currentStep}
            onPlay={handlePlay}
          />
        </div>
        <div className="game-info col-4">
          <h2>Game history</h2>
          <button className="btn btn-info mb-3" onClick={handleSort}>
            Reorder to: {isAscending ? "Descending" : "Ascending"}
          </button>
          <div className="list-group">
            {isAscending ? moves : moves.reverse()}
          </div>
        </div>
      </div>
    </>
  );
}
