'use client';

import { Button } from "./Button";

export function LoadGameButton() {

  const handleLoadGame = () => {
    console.log("이어하기 버튼 클릭함.");
  };
  return (
    <Button label="Load Game" onClick={handleLoadGame} />
  );
}