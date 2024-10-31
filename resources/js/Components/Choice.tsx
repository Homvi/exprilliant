import { useEffect, useState } from 'react';

interface ChoicePropType {
  handleSelect: (answerChosen: string) => void;
  content: string;
  order: number;
  isCorrect: boolean;
}

const Choice = ({ handleSelect, content, order, isCorrect }: ChoicePropType) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isClickable, setIsClickable] = useState(true);

  const isFontSizeLarge = false;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, order * 700); // Increasing the delay to make it more noticeable

    return () => clearTimeout(timer);
  }, [order]); // Adding 'order' to dependency array to make it clear it's used here

  function handleKeyPress(event: { key: string }, choice: string) {
    if (event.key === 'Enter') {
      handleChoice(choice);
    }
  }

  function handleClick() {
    if (isClickable) {
      handleChoice(content);
    }
  }

  function handleChoice(content: string): void {
    setIsHighlighted(true);
    setIsClickable(false);
    setTimeout(() => {
      setIsClickable(true);
      handleSelect(content);
    }, 1000);
  }

  return (
    <div
      onClick={handleClick}
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
