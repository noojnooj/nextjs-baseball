import { NewGameButton } from "./components/NewGameButton";
import { LoadGameButton } from "./components/LoadGameButton";
import { SettingsButton } from "./components/SettingsButton";
import { ExitButton } from "./components/ExitButton";

export default function StartScene() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Start Scene 초기화면</h1>
      
      {/* 새 게임 */}
      <NewGameButton /> 
      {/* 이어하기 */}
      <LoadGameButton />
      {/* 환경설정 */}
      <SettingsButton />
      {/* 종료 */}
      <ExitButton />

    </div>
  );
}