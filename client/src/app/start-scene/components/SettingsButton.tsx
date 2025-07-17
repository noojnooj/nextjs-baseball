'use client';

import { Button } from "./Button";

export function SettingsButton() {

  const handleSettings = () => {
    console.log("환경설정 버튼 클릭");
  };
  return (
    <Button label="Settings" onClick={handleSettings} />
  );
}