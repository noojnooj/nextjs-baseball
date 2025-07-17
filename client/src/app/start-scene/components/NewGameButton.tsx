import Button from "./Button";

export function NewGameButton() {

  const handleNewGame = () => {
    console.log("Starting a new game...");
    // Logic to start a new game goes here
  };
  return (
    <Button label="New Game" onClick={handleNewGame} />
  );
}