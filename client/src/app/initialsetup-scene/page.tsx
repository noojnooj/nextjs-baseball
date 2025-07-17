'use client';
import { useInitialSetupStore } from '@/store/initialSetupStore';
import { PlayerNameForm } from './components/PlayerNameForm';
import { GameLoreDialog } from './components/GameLoreDialog';
import { RegionSelector } from './components/RegionSelector';
import { TeamSetup } from './components/TeamSetup';
// ... 다른 단계 컴포넌트도 import

export default function InitialSetupPage() {
  const step = useInitialSetupStore((state) => state.currentStep);

  return (
    <>
      {step === 'playerName' && <PlayerNameForm />}
      {step === 'lore' && <GameLoreDialog />}
      {step === 'region' && <RegionSelector />}
      {step === 'team' && <TeamSetup />}
      {/* ...다른 단계 조건 */}
    </>
  );
}