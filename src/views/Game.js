import { useState } from "react";
import Board from "../components/Board";
import StepDetail from "../components/StepDetail";
import StepDetailList from "../components/StepDetailList";
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
          <StepDetailList
            stepsHistory={stepsHistory}
            currentStep={currentStep}
            currentMoveNumber={currentMoveNumber}
            onStepDetailClick={jumpTo}
          />
        </div>
      </div>
    </>
  );
}
