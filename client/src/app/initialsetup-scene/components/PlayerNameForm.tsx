'use client';

import { useInitialSetupStore } from '@/store/initialSetupStore';
import { useState } from 'react';

export function PlayerNameForm() {
  const setPlayerName = useInitialSetupStore((state) => state.setPlayerName);
  const goToNextStep = useInitialSetupStore((state) => state.goToNextStep);

  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (!input.trim()) return;
    setPlayerName(input);
    goToNextStep(); // 다음 단계로 이동
  };

  return (
    <div>
      <label htmlFor="playerName">Enter Player Name:</label>
      <input
        type="text"
        id="playerName"
        name="playerName"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <button onClick={handleSubmit}>확인</button>
    </div>
  );
}