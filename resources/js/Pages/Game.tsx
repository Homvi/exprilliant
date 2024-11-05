import { Head } from '@inertiajs/react';
import Score from '@/Components/Score';
import CustomGuestLayout from '../Layouts/CustomGuestLayout';
import GameInProgress from '@/Components/GameInProgress';
import { useGameMode } from '@/contexts/GameModeContext';
import { useGameStore } from '@/store/gameStore';
import { useExpressions } from '@/hooks/useExpressions';
import { numberOfExpressions } from '@/config';
import { useEffect } from 'react';
import { updateExperience } from '@/functions/gameHelpers';
import { useToplistStore } from '@/store/toplistStore';

const Game = () => {
  const { gameMode } = useGameMode();
  const { isGameFinished, score } = useGameStore();
  const { fetchToplistData } = useToplistStore();

  if (gameMode) {
    useExpressions(gameMode, numberOfExpressions);
  } else {
    window.location.href = '/choose-game-mode';
  }

  useEffect(() => {
    const updateScoreAndFetchData = async () => {
      if (isGameFinished && score > 0) {
        await updateExperience(score);
        await fetchToplistData();
      }
    };

    updateScoreAndFetchData();
  }, [isGameFinished]);

  return (
    <>
      <Head title="Game" />
      <CustomGuestLayout>
        <div className="h-full flex flex-col items-center gap-3 mt-3 mx-3 font-nova">
          {isGameFinished ? <Score /> : <GameInProgress />}
        </div>
      </CustomGuestLayout>
    </>
  );
};

export default Game;
