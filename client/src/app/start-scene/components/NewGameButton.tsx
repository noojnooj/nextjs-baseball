'use client';

import { Button } from "./Button";
import { useRouter } from "next/navigation";

export function NewGameButton() {
  const router = useRouter();

  const handleNewGame = () => {
    router.push("/initialsetup-scene")

  };
  return (
    <Button label="New Game" onClick={handleNewGame} />
  );
}