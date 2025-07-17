import { create } from 'zustand';

type SetupStep = 'playerName' | 'lore' | 'region' | 'team';

interface InitialSetupState {
  playerName: string;
  currentStep: SetupStep;
  setPlayerName: (name: string) => void;
  setRegion: (region: string) => void;
  goToNextStep: () => void;
}

export const useInitialSetupStore = create<InitialSetupState>((set, get) => ({
  playerName: '',
  currentStep: 'playerName',
  setPlayerName: (name) => set({ playerName: name }),
  setRegion: (region) => {
    // 여기에 지역 설정 로직을 추가할 수 있습니다.
    console.log(`Selected region: ${region}`);
  },
  goToNextStep: () => {
    const steps: SetupStep[] = ['playerName', 'lore', 'region', 'team'];
    const currentIndex = steps.indexOf(get().currentStep);
    const nextStep = steps[currentIndex + 1] || 'team';
    set({ currentStep: nextStep });
  },
}));