export default function StepDetail({
  stepsHistory,
  currentMoveNumber,
  moveNumber,
  stepDetailHeading,
  onStepDetailClick,
}) {
  const stepPlayerSymbol = stepsHistory[moveNumber].playerSymbol;
  const stepRowPosition = stepsHistory[moveNumber].rowPosition;
  const stepColumnPosition = stepsHistory[moveNumber].columnPosition;
  let stepDetailDescription = "";

  if (moveNumber === currentMoveNumber && moveNumber !== 0) {
    stepDetailDescription =
      "Player " +
      stepPlayerSymbol +
      " placed a move in row " +
      stepRowPosition +
      ", column " +
      stepColumnPosition;
  }

  return (
    <button
      type="button"
      className={[
        "list-group-item list-group-item-action",
        moveNumber === currentMoveNumber ? "disabled" : "",
      ].join(" ")}
      onClick={onStepDetailClick}
    >
      <h4>{stepDetailHeading}</h4>
      <small>{stepDetailDescription !== "" ? stepDetailDescription : ""}</small>
    </button>
  );
}
