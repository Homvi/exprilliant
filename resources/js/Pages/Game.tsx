//resources/js/Pages/Game.jsx

import { useEffect, useRef, useState } from 'react';
import { Head } from '@inertiajs/react';
import Score from '@/Components/Score';
import ProgressBar from '@/Components/ProgressBar';
import Choice from '@/Components/Choice';
import CustomGuestLayout from '../Layouts/CustomGuestLayout';
import { useGameMode } from '@/contexts/GameModeContext';
import { shuffle } from 'lodash';
import ExpressionsContainer from '@/Components/ExpressionsContainer';
import ActiveExpressionHeader from '@/Components/ActiveExpressionHeader';
import { numberOfExpressions } from '@/config';
import ExampleUsage from '@/Components/ExampleUsage';
import axios from 'axios';
import { User } from '@/types';
import { ActiveExpressionChoiceType, Expression } from '@/types/Expressions';

interface GamePropType {
  users: User[];
}

const Game = ({ users }: GamePropType) => {
  const [loading, setLoading] = useState(true);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [expressions, setExpressions] = useState([]);
  const [activeExpressionIndex, setActiveExpressionIndex] = useState(0);
  const [isClickable, setIsClickable] = useState(true);
  const [activeExpressionChoices, setActiveExpressionChoices] = useState<ActiveExpressionChoiceType[]>([]);
  const [isExampleUsageVisible, setIsExampleUsageVisible] = useState(false);
  const score = useRef(0);
  const { gameMode } = useGameMode();

  let activeExpressionWithAnswers: Expression = expressions[activeExpressionIndex];
  let activeExpression = activeExpressionWithAnswers?.expression;

  // if no game mode choosen redirect user
  useEffect(() => {
    if (!gameMode) {
      window.location.href = '/choose-game-mode';
    } else {
      fetchRandomExpressions();
    }
  }, [isGameFinished, gameMode]);

  const handleKeyPress = (event: { key: string }, answerChosen: string) => {
    if (event.key === 'Enter') {
      handleChoice(answerChosen);
    }
  };

  const fetchRandomExpressions = async () => {
    try {
      const response = await axios.get(
        `/random-expressions?mode=${gameMode}&numberOfExpressions=${numberOfExpressions}`
      );
      setExpressions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching random expressions:', error);
    }
  };

  async function resetGame() {
    setLoading(true);
    setIsGameFinished(false);
    score.current = 0;
    setActiveExpressionIndex(0);
  }

  // create fade in anmation for header
  useEffect(() => {
    setFadeIn(true);
    const timer = setTimeout(() => {
      setFadeIn(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeExpressionIndex]);

  async function handleFinish() {
    if (numberOfExpressions === activeExpressionIndex) {
      setIsGameFinished(true);
      // Send the score to update the user's experience
      try {
        await axios.post('/update-experience', {
          experienceToAdd: score.current
        });
      } catch (error) {
        console.error('Error updating experience:', error);
      }
    }
  }

  useEffect(() => {
    handleFinish();
  }, [activeExpressionIndex]);

  function handleChoice(answerChosen: string) {
    const isCorrect = answerChosen === activeExpressionWithAnswers?.right_answer;
    setIsClickable(false);
    highlightChoices(answerChosen);
    setIsExampleUsageVisible(true);
    setTimeout(() => {
      if (isCorrect) score.current++;
      handleActiveExpressionIncrement();
      setIsClickable(true);
      setIsExampleUsageVisible(false);
    }, 2000);
  }

  function getChoicesInShuffledOrder(activeExpressionWithAnswers: Expression) {
    const shuffledOrders = shuffle([1, 2, 3]);

    const activeExpressionChoices = [
      {
        answer: activeExpressionWithAnswers?.right_answer,
        order: shuffledOrders[0],
        correct: true,
        highlight: false
      },
      {
        answer: activeExpressionWithAnswers?.false_answer_one,
        order: shuffledOrders[1],
        correct: false,
        highlight: false
      },
      {
        answer: activeExpressionWithAnswers?.false_answer_two,
        order: shuffledOrders[2],
        correct: false,
        highlight: false
      }
    ];

    // sort activeExpressionChoices by order number
    activeExpressionChoices.sort((a, b) => a.order - b.order);

    return activeExpressionChoices;
  }

  function highlightChoices(answerChosen: string) {
    setActiveExpressionChoices((prevChoices) =>
      prevChoices.map((choice) =>
        choice.answer === answerChosen || choice.correct ? { ...choice, highlight: true } : choice
      )
    );
  }

  useEffect(() => {
    const activeExpressionChoices = getChoicesInShuffledOrder(expressions[activeExpressionIndex]);
    setActiveExpressionChoices(activeExpressionChoices);
  }, [activeExpressionIndex, expressions]);

  const progress: number = (activeExpressionIndex / numberOfExpressions) * 100;

  function handleActiveExpressionIncrement() {
    setActiveExpressionIndex((curr) => curr + 1);
  }

  return (
    <>
      <Head title="Game" />
      <CustomGuestLayout>
        <div className="h-full relative flex justify-start items-center flex-col gap-3 font-nova overflow-x-hidden mt-3  mx-3">
          {loading && <p>Loading...</p>}
          {loading && <span className="loading loading-infinity loading-lg"></span>}
          {!loading && !isGameFinished && (
            <>
              <ProgressBar progress={progress} />
              <ExpressionsContainer fadeIn={fadeIn}>
                <ActiveExpressionHeader>{activeExpression}</ActiveExpressionHeader>
                <div className="flex flex-col gap-3 w-full overflow-hidden">
                  {activeExpressionChoices.map((choice, id) => (
                    <Choice
                      key={`${choice.answer}-choice-${id}`}
                      order={choice.order}
                      isHighlighted={choice.highlight}
                      isCorrect={choice.correct}
                      handleChoice={handleChoice}
                      handleKeyPress={handleKeyPress}
                      isClickable={isClickable}
                      content={choice.answer}
                    />
                  ))}
                </div>
                {activeExpressionWithAnswers?.example_usage && isExampleUsageVisible && (
                  <ExampleUsage text={activeExpressionWithAnswers?.example_usage} />
                )}
              </ExpressionsContainer>
            </>
          )}
          {/* show score */}
          {isGameFinished && <Score score={score.current} users={users} resetGame={resetGame} />}
        </div>
      </CustomGuestLayout>
    </>
  );
};

export default Game;
