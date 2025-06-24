import { useState } from "react";
import Board from "../components/Board";
import { PlayerStep } from "../objects/PlayerStep";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // !OOP of history state => TODO
  const [stepsHistory, setStepsHistory] = [];
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  // !OOP of currentSquares
  const currentStep = history[currentMove];
  const [isAscending, setIsAscending] = useState(true);
  const [isInHistory, setIsInHistory] = useState(false);

  function handlePlay(nextSquares, currentStep) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    //OOP
    // setStepsHistory(stepsHistory.push(currentStep));
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
   * TODO => use class PlayerStep instead of arrays
   */
  let newStep = new PlayerStep("X", 2, 1);

  /**
   * Display history of game
   */
  const moves = history.map((squares, move) => {
    let description;
    let position;

    if (move === currentMove) {
      description = "You are at move # " + move;
      const previousSteps =
        history[move - 1] === undefined ? [] : history[move - 1];
      const currentSteps = history[move];
      const differenceSteps = [];

      currentSteps.forEach((playerSymbol, place) => {
        if (previousSteps[place] !== playerSymbol) {
          differenceSteps[place] = playerSymbol;
        }
      });

      position = "";
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
        <small>{position}</small>
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
