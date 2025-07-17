'use client';
import { useRouter } from "next/navigation";

export function TeamSetup() {
  const router = useRouter();

  const handleTeam = () => {
    // 팀 설정 로직을 여기에 추가합니다.
    // 예를 들어, 선택한 팀 정보를 저장하거나 다음 단계로 이동하는 등의 작업을 수행할 수 있습니다.
    console.log("팀 설정 완료");
    router.push("/game-scene"); // 다음 단계로 이동
  };

  return (
    <div>
      {/* 9명의 선수들 스탯 선택 */}
      <h2 className="text-xl font-semibold mb-4">팀 구성</h2>


      <button onClick={handleTeam}>완료</button>
    </div>
  );
}