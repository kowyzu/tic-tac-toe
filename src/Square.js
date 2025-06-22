import { useState } from "react";

export default function Square({ value, onSquareClick, isHighlighted }) {
  // console.log(isHighlighted);
  return (
    <button
      className={["square", isHighlighted === true ? "highlighted" : ""].join(
        " "
      )}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
