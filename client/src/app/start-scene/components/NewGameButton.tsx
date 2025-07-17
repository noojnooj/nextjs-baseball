'use client';

import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export function NewGameButton() {

  const handleNewGame = () => {
    console.log("초기화면 넘어가요~");
  };
  return (
    <Button label="New Game" onClick={handleNewGame} />
  );
}