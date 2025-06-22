import { useState } from "react";

export default function Square({
  value,
  onSquareClick,
  isDraw,
  isHighlighted,
}) {
  return (
    <button
      className={[
        "square",
        isHighlighted === true ? "highlighted" : "",
        isDraw === true ? "draw" : "",
      ].join(" ")}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
