import { useState } from "react";
import Board from "../components/Board";
import StepDetail from "../components/StepDetail";
import { PlayerStep } from "../objects/PlayerStep";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // !OOP of history state => TODO
  const gameStartStep = new PlayerStep("", null, null, null);
  const [stepsHistory, setStepsHistory] = useState([gameStartStep]);
  const [currentMoveNumber, setCurrentMoveNumber] = useState(0);
  const xIsNext = currentMoveNumber % 2 === 0;
  const currentSquares = history[currentMoveNumber];
  // !OOP of currentSquares
  const currentStep = stepsHistory[currentMoveNumber];
  const [isAscending, setIsAscending] = useState(true);
  const [isInHistory, setIsInHistory] = useState(false);

  function handlePlay(nextSquares, currentStep) {
    const nextHistory = [
      ...history.slice(0, currentMoveNumber + 1),
      nextSquares,
    ];
    setHistory(nextHistory);
    setCurrentMoveNumber(nextHistory.length - 1);

    //OOP

    setStepsHistory([...stepsHistory, currentStep]);
  }

  /**
   * Display chosen previous history move
   */
  function jumpTo(nextMove, moves) {
    setCurrentMoveNumber(nextMove);

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

    if (move === currentMoveNumber) {
      description = "You are at move # " + move;
    } else if (move > 0) {
      description = "Look at move # " + move;
    } else {
      description = "Look at game start";
    }

    return (
      <StepDetail
        key={move}
        stepsHistory={stepsHistory}
        currentStep={currentStep}
        currentMoveNumber={currentMoveNumber}
        description={description}
        move={move}
        onStepDetailClick={() => jumpTo()}
      />
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
            {moves}
            {/* {isAscending ? moves : moves.reverse()} */}
          </div>
        </div>
      </div>
    </>
  );
}
