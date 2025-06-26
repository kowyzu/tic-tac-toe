import StepDetail from "./StepDetail";

export default function StepDetailList({
  stepsHistory,
  currentStep,
  currentMoveNumber,
  onStepDetailClick,
}) {
  /**
   * Display history of game
   */
  const moves = stepsHistory.map((step, moveNumber) => {
    let description;

    if (moveNumber === currentMoveNumber) {
      description = "You are at move # " + moveNumber;
    } else if (moveNumber > 0) {
      description = "Look at move # " + moveNumber;
    } else {
      description = "Look at game start";
    }

    return (
      <StepDetail
        key={moveNumber}
        stepsHistory={stepsHistory}
        currentMoveNumber={currentMoveNumber}
        moveNumber={moveNumber}
        description={description}
        onStepDetailClick={() => onStepDetailClick(moveNumber, moves)}
      />
    );
  });

  return (
    <div className="list-group">
      {moves}
      {/* {isAscending ? moves : moves.reverse()} */}
    </div>
  );
}
