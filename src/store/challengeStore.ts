import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface ChallengeState {
  xp: number;
  level: number;
  completedChallenges: string[];
  badges: string[];

  addXP: (amount: number) => void;
  completeChallenge: (id: string, xp: number) => void;
  unlockBadge: (badge: string) => void;
}

export const useChallengeStore = create<ChallengeState>()(
  persist(
    (set) => ({
      xp: 0,
      level: 1,
      completedChallenges: [],
      badges: [],

      addXP: (amount) => set((state) => {
        const newXP = state.xp + amount;
        const newLevel = Math.floor(newXP / 100) + 1;
        return { xp: newXP, level: newLevel };
      }),

      completeChallenge: (id, xp) => set((state) => {
        if (state.completedChallenges.includes(id)) return state;
        const newXP = state.xp + xp;
        const newLevel = Math.floor(newXP / 100) + 1;
        return {
          completedChallenges: [...state.completedChallenges, id],
          xp: newXP,
          level: newLevel
        };
      }),

      unlockBadge: (badge) => set((state) => ({
        badges: state.badges.includes(badge) ? state.badges : [...state.badges, badge]
      })),
    }),
    { name: 'dsa-sandbox-challenges' }
  )
);
