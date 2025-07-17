import { NewGameButton } from "./components/NewGameButton";

export default function StartScene() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to the Baseball Game</h1>
      <NewGameButton />
    </div>
  );
}