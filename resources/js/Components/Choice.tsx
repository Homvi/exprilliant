import { useEffect, useState } from 'react';

interface ChoicePropType {
  handleSelect: (answerChosen: string) => void;
  content: string;
  order: number;
  isCorrect: boolean;
  isHighlighted: boolean;
  isBlocked: boolean;
}

const Choice = ({ handleSelect, content, isBlocked, order, isCorrect, isHighlighted }: ChoicePropType) => {
  const [isVisible, setIsVisible] = useState(false);

  const isFontSizeLarge = false;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, order * 700);

    return () => clearTimeout(timer);
  }, [order]);

  function handleKeyPress(event: { key: string }, choice: string) {
    if (event.key === 'Enter') {
      if (!isBlocked) {
        handleSelect(choice);
      }
    }
  }

  function handleClick() {
    if (!isBlocked) {
      handleSelect(content);
    } else {
      console.log('This button is diasbled due to it is highlighted state');
    }
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
