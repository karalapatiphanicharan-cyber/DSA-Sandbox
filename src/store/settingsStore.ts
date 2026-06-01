import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  theme: 'light' | 'dark';
  vibrationEnabled: boolean;
  soundEnabled: boolean;
  showComplexity: boolean;
  showCode: boolean;

  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleVibration: () => void;
  toggleSound: () => void;
  toggleComplexity: () => void;
  toggleCode: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      vibrationEnabled: true,
      soundEnabled: true,
      showComplexity: true,
      showCode: true,

      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setTheme: (theme) => set({ theme }),
      toggleVibration: () => set((state) => ({ vibrationEnabled: !state.vibrationEnabled })),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleComplexity: () => set((state) => ({ showComplexity: !state.showComplexity })),
      toggleCode: () => set((state) => ({ showCode: !state.showCode })),
    }),
    {
      name: 'dsa-sandbox-settings',
    }
  )
);
