import { GameMode } from '@/types/GameMode';
import { useEffect, useState } from 'react';

interface ChoicePropType {
  handleChoice: (answerChosen: string) => void;
  handleKeyPress: (event: { key: string }, answerChosen: string) => void;
  content: string;
  isClickable: boolean;
  isHighlighted: boolean;
  isCorrect: boolean;
  order: number;
}

const Choice = ({
  handleChoice,
  handleKeyPress,
  content,
  isClickable,
  isHighlighted,
  isCorrect,
  order
}: ChoicePropType) => {
  const isFontSizeLarge = false;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, order * 700); // Increasing the delay to make it more noticeable

    return () => clearTimeout(timer);
  }, [order]); // Adding 'order' to dependency array to make it clear it's used here

  return (
    <div
      onClick={() => {
        if (isClickable) {
          handleChoice(content);
        }
      }}
      onKeyDown={(e) => handleKeyPress(e, content)}
      className={`
      ${isVisible ? 'opacity-100' : 'opacity-0'}
      ${isHighlighted && isCorrect && 'bg-green-300 '}
      ${isHighlighted && !isCorrect && 'bg-red-300 '}
       order-${order} w border-2 min-w-[200px] md:min-w-[500px] w-full flex justify-center items-center p-3 rounded-lg cursor-pointer transition-all duration-100`}
    >
      <p className={isFontSizeLarge ? 'text-xl' : 'text-md'}>{content}</p>
    </div>
  );
};

export default Choice;
