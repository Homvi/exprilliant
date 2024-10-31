import { Head } from '@inertiajs/react';
import Score from '@/Components/Score';
import CustomGuestLayout from '../Layouts/CustomGuestLayout';
import GameInProgress from '@/Components/GameInProgress';
import { useGameMode } from '@/contexts/GameModeContext';
import { useGameStore } from '@/store/gameStore';
import { useFetchExpressions } from '@/hooks/useFetchExpressions';
import { User } from '@/types';
import { numberOfExpressions } from '@/config';

const Game: React.FC<{ users: User[] }> = ({ users }) => {
  const { gameMode } = useGameMode();
  const { isGameFinished } = useGameStore();

  if (gameMode) {
    useFetchExpressions(gameMode, numberOfExpressions);
  } else {
    window.location.href = '/choose-game-mode';
  }

  return (
    <>
      <Head title="Game" />
      <CustomGuestLayout>
        <div className="h-full flex flex-col items-center gap-3 mt-3 mx-3 font-nova">
          {isGameFinished ? <Score users={users} /> : <GameInProgress />}
        </div>
      </CustomGuestLayout>
    </>
  );
};

export default Game;
