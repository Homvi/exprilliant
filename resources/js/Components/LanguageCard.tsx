import { useGameMode } from '@/contexts/GameModeContext';
import { Link } from '@inertiajs/react';

const LanguageCard = ({ questionFlag, answerFlag, text, gameMode, questionFlagAltText, answerFlagAltText, count }) => {
  // allow to set game mode with useContext
  const { setGameMode } = useGameMode();

  const handleGameModeSelection = (mode) => {
    setGameMode(mode);
  };

  return (
    <Link href="/game" onClick={() => handleGameModeSelection(gameMode)} className="w-full px-5 md:px-0 md:w-fit">
      <div className="border-[1px] border-white/10 flex w-full p-5 bg-white/5 text-center cursor-pointer rounded-xl flex-col hover:border-white/40 transition-all duration-100 hover:bg-white/10 items-center">
        <img src={questionFlag} alt={questionFlagAltText} className="w-full max-w-44 mb-2" />
        <div className="flex justify-center space-x-1">
          <img src={answerFlag} alt={answerFlagAltText} className="w-12 h-12 md:w-10 md:h-10" />
          <img src={answerFlag} alt={answerFlagAltText} className="w-12 h-12 md:w-10 md:h-10" />
          <img src={answerFlag} alt={answerFlagAltText} className="w-12 h-12 md:w-10 md:h-10" />
        </div>

        {/* text content eg.: "Spanish expressions" */}
        <h3 className="mt-3 text-xl">
          {text} <span className="opacity-30">({count})</span>{' '}
        </h3>
      </div>
    </Link>
  );
};

export default LanguageCard;
