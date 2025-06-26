export default function StepDetail({
  stepsHistory,
  currentMoveNumber,
  moveNumber,
  description,
  onStepDetailClick,
}) {
  const stepPlayerSymbol = stepsHistory[moveNumber].playerSymbol;
  const stepRowPosition = stepsHistory[moveNumber].rowPosition;
  const stepColumnPosition = stepsHistory[moveNumber].columnPosition;

  return (
    <button
      type="button"
      className={[
        "list-group-item list-group-item-action",
        moveNumber === currentMoveNumber ? "disabled" : "",
      ].join(" ")}
      onClick={onStepDetailClick}
    >
      <h4>{description}</h4>
      <small>
        Player {stepPlayerSymbol} placed a move in row {stepRowPosition}, column{" "}
        {stepColumnPosition}
      </small>
    </button>
  );
}
