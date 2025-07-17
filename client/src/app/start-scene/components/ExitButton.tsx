'use client';

import { Button } from "./Button";

export function ExitButton() {

  const handleExit = () => {
    console.log("게임 종료");
  };
  return (
    <Button label="Exit" onClick={handleExit} />
  );
}