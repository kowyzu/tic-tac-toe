export default function StepDetail({
  stepsHistory,
  currentStep,
  currentMoveNumber,
  description,
  move,
  onStepDetailClick,
}) {
  return (
    <button
      key={move}
      type="button"
      className={[
        "list-group-item list-group-item-action",
        move === currentMoveNumber ? "disabled" : "",
      ].join(" ")}
      // onClick={onStepDetailClick(currentMoveNumber, moves)}
    >
      {/* <h4>{description}</h4>
      <small>row</small> */}
    </button>
  );
}
