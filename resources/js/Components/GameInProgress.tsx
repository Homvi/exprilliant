import ProgressBar from '@/Components/ProgressBar';
import ExpressionsContainer from '@/Components/ExpressionsContainer';
import ActiveExpressionHeader from '@/Components/ActiveExpressionHeader';
import Choice from '@/Components/Choice';
import ExampleUsage from '@/Components/ExampleUsage';
import { useGameStore } from '@/store/gameStore';
import { useGameProgress } from '@/hooks/useGameProgress';
import { ActiveExpressionChoiceType } from '@/types/Expressions';
import { getChoicesInShuffledOrder } from '@/functions/gameHelpers';
import { useEffect, useState } from 'react';

const GameInProgress: React.FC = () => {
  const { expressions, activeExpressionIndex } = useGameStore();
  const { handleChoice } = useGameProgress();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [activeExpressionChoices, setActiveExpressionChoices] = useState<ActiveExpressionChoiceType[]>([]);

  useEffect(() => {
    const activeExpressionChoices = getChoicesInShuffledOrder(expressions[activeExpressionIndex]);
    setActiveExpressionChoices(activeExpressionChoices);
  }, [activeExpressionIndex, expressions]);

  useEffect(() => {
    if (selectedAnswer) {
      highlightChoices(selectedAnswer);
    }
  }, [selectedAnswer]);

  function handleSelectAnswer(choice: string): void {
    if (isBlocked) return; // Prevent double selection
    setIsBlocked(true);
    setSelectedAnswer(choice);
    setTimeout(() => {
      handleChoice(choice);
      setIsBlocked(false);
      setSelectedAnswer(null);
    }, 1000);
  }

  function highlightChoices(answerChosen: string) {
    setActiveExpressionChoices((prevChoices) =>
      prevChoices.map((choice) =>
        choice.answer === answerChosen || choice.correct ? { ...choice, highlight: true } : choice
      )
    );
  }

  const activeExpression = expressions[activeExpressionIndex];

  if (!activeExpression) return null;

  return (
    <>
      <ProgressBar />
      <ExpressionsContainer>
        <ActiveExpressionHeader>{activeExpression.expression}</ActiveExpressionHeader>
        <div className="flex flex-col gap-3">
          {activeExpressionChoices.map((choice, id) => (
            <Choice
              isHighlighted={choice.highlight}
              isBlocked={isBlocked}
              key={`${id}_${choice.answer}`}
              handleSelect={handleSelectAnswer}
              isCorrect={choice.correct}
              {...choice}
              content={choice.answer}
            />
          ))}
        </div>
        {activeExpression.example_usage && <ExampleUsage text={activeExpression.example_usage} />}
      </ExpressionsContainer>
    </>
  );
};

export default GameInProgress;
