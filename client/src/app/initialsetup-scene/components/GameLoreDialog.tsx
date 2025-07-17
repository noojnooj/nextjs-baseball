"use client";

import { useState } from "react";
import { useInitialSetupStore } from "@/store/initialSetupStore";

export function GameLoreDialog() {
  const goToNextStep = useInitialSetupStore((state) => state.goToNextStep);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // Store all lore lines in an array, matching original <p> content and style
  const loreLines = [
    {
      text: "수십 년 전, 야구는 이 나라 최고의 스포츠였습니다. 하지만 무분별한 자본, 비리, 팬들의 외면으로 리그는 결국 해체되고 말았죠.",
      className: "mb-2",
    },
    {
      text: "그리고 지금, 다시 한 번 야구의 열기를 되살리려는 시도가 시작됩니다. 당신은 부활한 리그의 첫 번째 감독으로 지명되었습니다.",
      className: "mb-2",
    },
    {
      text: "재능 있는 선수들을 발굴하고, 팬들의 마음을 사로잡으며 야구의 전설을 다시 써 내려갈 준비가 되셨나요?",
      className: "mb-2",
    },
    {
      text: "당신의 구단. 당신의 리그. 그리고 당신의 야구가 시작됩니다.",
      className: "font-semibold text-lg mt-4",
    },
  ];

  const handleClick = () => {
    if (currentLineIndex < loreLines.length - 1) {
      setCurrentLineIndex((prev) => prev + 1);
    } else {
      goToNextStep();
    }
  };

  return (
    <div className="game-lore-dialog cursor-pointer" onClick={handleClick}>
      <h2 className="text-2xl font-bold mb-4">리그의 부활</h2>
      <p className={loreLines[currentLineIndex].className}>
        {loreLines[currentLineIndex].text}
      </p>
      <p className="mt-4 text-sm text-gray-400">(화면을 클릭하면 계속됩니다)</p>
    </div>
  );
}