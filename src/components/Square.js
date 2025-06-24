export default function Square({
  value,
  onSquareClick,
  isDraw,
  isHighlighted,
  row,
  numberPosition,
}) {
  return (
    <button
      className={[
        "square",
        isHighlighted ? "highlighted" : "",
        isDraw ? "draw" : "",
      ].join(" ")}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
