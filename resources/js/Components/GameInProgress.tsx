// GameInProgress.tsx
import ProgressBar from '@/Components/ProgressBar';
import ExpressionsContainer from '@/Components/ExpressionsContainer';
import ActiveExpressionHeader from '@/Components/ActiveExpressionHeader';
import Choice from '@/Components/Choice';
import ExampleUsage from '@/Components/ExampleUsage';
import { useGameStore } from '@/store/gameStore';
import { useGameProgress } from '@/hooks/useGameProgress';
import { ActiveExpressionChoiceType } from '@/types/Expressions';
import { getChoicesInShuffledOrder } from '@/functions/gameHelpers';

const GameInProgress: React.FC = () => {
  const { expressions, activeExpressionIndex } = useGameStore();
  const { handleChoice } = useGameProgress();

  const activeExpression = expressions[activeExpressionIndex];

  if (!activeExpression) return null;

  // Generate choices using getChoicesInShuffledOrder
  const activeExpressionChoices: ActiveExpressionChoiceType[] = getChoicesInShuffledOrder(activeExpression);

  return (
    <>
      <ProgressBar />
      <ExpressionsContainer>
        <ActiveExpressionHeader>{activeExpression.expression}</ActiveExpressionHeader>
        <div className="flex flex-col gap-3">
          {activeExpressionChoices.map((choice, id) => (
            <Choice
              key={`${id}_${choice.answer}`}
              handleSelect={handleChoice}
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
