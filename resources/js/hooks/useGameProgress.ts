// hooks/useGameProgress.ts
import { useGameStore } from '@/store/gameStore';

export const useGameProgress = () => {
  const { activeExpressionIndex, expressions, nextExpression, incrementScore } = useGameStore();

  const handleChoice = (choice: string) => {
    const isCorrect = choice === expressions[activeExpressionIndex].right_answer;
    if (isCorrect) incrementScore();
    nextExpression();
  };

  const progress = (activeExpressionIndex / expressions.length) * 100;

  return { progress, handleChoice };
};
