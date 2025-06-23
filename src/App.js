import { useState } from "react";
import Game from "./views/Game";
import TheNavigation from "./components/TheNavigation";

export default function App() {
  return (
    <>
      <TheNavigation />
      <Game />
    </>
  );
}
