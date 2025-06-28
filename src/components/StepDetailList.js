import { useState } from "react";
import StepDetail from "./StepDetail";

export default function StepDetailList({
  stepsHistory,
  currentStep,
  currentMoveNumber,
  onStepDetailClick,
}) {
  const [isAscending, setIsAscending] = useState(true);

  /**
   * Sort history moves list in descending/ascending order
   */
  function handleSort() {
    setIsAscending(!isAscending);
  }

  /**
   * Display history of game
   */
  const moves = stepsHistory.map((step, moveNumber) => {
    let stepDetailHeading;

    if (moveNumber === currentMoveNumber) {
      stepDetailHeading = "You are at move # " + moveNumber;
    } else if (moveNumber > 0) {
      stepDetailHeading = "Look at move # " + moveNumber;
    } else {
      stepDetailHeading = "Look at game start";
    }

    return (
      <StepDetail
        key={moveNumber}
        stepsHistory={stepsHistory}
        currentMoveNumber={currentMoveNumber}
        moveNumber={moveNumber}
        stepDetailHeading={stepDetailHeading}
        onStepDetailClick={() => onStepDetailClick(moveNumber, moves)}
      />
    );
  });

  return (
    <>
      <h2>Game history</h2>
      <button className="btn btn-info mb-3" onClick={handleSort}>
        Reorder to: {isAscending ? "Descending" : "Ascending"}
      </button>
      <div className="list-group">{isAscending ? moves : moves.reverse()}</div>
    </>
  );
}
