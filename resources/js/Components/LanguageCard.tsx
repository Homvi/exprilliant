import React, { useState, useEffect } from 'react';
import { useGameMode } from '@/contexts/GameModeContext';
import { GameMode } from '@/types/GameMode';
import { Link } from '@inertiajs/react';

interface LanguageCardProps {
  questionFlag: string;
  answerFlag: string;
  text: string;
  gameMode: GameMode;
  questionFlagAltText: string;
  answerFlagAltText: string;
  count: number;
  delay?: number; // Optional delay prop for staggered animations
}

const LanguageCard: React.FC<LanguageCardProps> = ({
  questionFlag,
  answerFlag,
  text,
  gameMode,
  questionFlagAltText,
  answerFlagAltText,
  count,
  delay = 0 // Default delay of 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { setGameMode } = useGameMode();

  useEffect(() => {
    // Create a timeout to trigger the fade-in after the specified delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleGameModeSelection = (mode: GameMode) => {
    setGameMode(mode);
  };

  return (
    <Link href="/game" onClick={() => handleGameModeSelection(gameMode)} className="w-full px-5 md:px-0 md:w-fit">
      <div
        className={`
          border-[1px] border-white/10
          flex w-full p-5
          bg-white/5 text-center
          cursor-pointer rounded-xl
          flex-col
          hover:border-white/40
          transition-all duration-300
          hover:bg-white/10
          items-center
          ${!isVisible ? 'opacity-0 translate-x-28' : 'opacity-100 transition-all duration-300 translate-y-0'}
        `}
      >
        <img src={questionFlag} alt={questionFlagAltText} className="w-full max-w-44 mb-2" />
        <div className="flex justify-center space-x-1">
          <img src={answerFlag} alt={answerFlagAltText} className="w-12 h-12 md:w-10 md:h-10" />
          <img src={answerFlag} alt={answerFlagAltText} className="w-12 h-12 md:w-10 md:h-10" />
          <img src={answerFlag} alt={answerFlagAltText} className="w-12 h-12 md:w-10 md:h-10" />
        </div>

        <h3 className="mt-3 text-xl">
          {text} <span className="opacity-30">({count})</span>{' '}
        </h3>
      </div>
    </Link>
  );
};

export default LanguageCard;
