// store/gameStore.ts
import { Expression } from '@/Types/Expressions';
import { create } from 'zustand'

interface GameState {
  expressions: Expression[];
  activeExpressionIndex: number;
  score: number;
  isGameFinished: boolean;
  setExpressions: (expressions: Expression[]) => void;
  incrementScore: () => void;
  nextExpression: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  expressions: [],
  activeExpressionIndex: 0,
  score: 0,
  isGameFinished: false,
  setExpressions: (expressions) => set({ expressions }),
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  nextExpression: () =>
    set((state) => ({
      activeExpressionIndex: state.activeExpressionIndex + 1,
      isGameFinished: state.activeExpressionIndex + 1 >= state.expressions.length
    })),
  resetGame: () => set({ activeExpressionIndex: 0, score: 0, isGameFinished: false })
}));
