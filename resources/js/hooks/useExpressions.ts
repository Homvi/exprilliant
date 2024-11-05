// hooks/useFetchExpressions.ts
import { useEffect } from 'react';
import axios from 'axios';
import { useGameStore } from '@/store/gameStore';
import { Expression } from '@/types/Expressions';

export const useExpressions = (gameMode: string, numberOfExpressions: number) => {
  const setExpressions = useGameStore((state) => state.setExpressions);

  useEffect(() => {
    const fetchExpressions = async () => {
      try {
        const response = await axios.get<Expression[]>(
          `/random-expressions?mode=${gameMode}&numberOfExpressions=${numberOfExpressions}`
        );
        setExpressions(response.data);
      } catch (error) {
        console.error('Failed to fetch expressions:', error);
      }
    };
    fetchExpressions();
  }, [gameMode, numberOfExpressions, setExpressions]);
};
