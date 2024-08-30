//resources/js/Pages/Game.jsx

import { useEffect, useRef, useState } from "react";
import Score from "../Components/Score";
import ProgressBar from "../Components/ProgressBar";
import Choice from "../Components/Choice.jsx";
import CustomGuestLayout from "../Layouts/CustomGuestLayout";
import { useGameMode } from "@/contexts/GameModeContext";
import { Head } from "@inertiajs/react";
import { shuffle } from "lodash";
import ExpressionsContainer from "@/Components/ExpressionsContainer";
import ActiveExpressionHeader from "@/Components/ActiveExpressionHeader";

const Game = () => {
    const [loading, setLoading] = useState(true);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const [expressions, setExpressions] = useState([]);
    const [activeExpressionIndex, setActiveExpressionIndex] = useState(0);
    const [isClickable, setIsClickable] = useState(true);
    const [activeExpressionChoices, setActiveExpressionChoices] = useState([]);

    const score = useRef(0);
    const { gameMode } = useGameMode();

    let activeExpressionWithAnswers = expressions[activeExpressionIndex];
    let activeExpression = activeExpressionWithAnswers?.expression;

    // if no game mode choosen redirect user
    useEffect(() => {
        if (!gameMode) {
            window.location.href = "/choose-game-mode";
        } else {
            fetchRandomExpressions();
        }
    }, [isGameFinished, gameMode]);

    const handleKeyPress = (event, answerChosen) => {
        if (event.key === "Enter") {
            handleChoice(answerChosen);
        }
    };

    const numberOfExpressions = 5;

    const fetchRandomExpressions = async () => {
        try {
            const response = await axios.get(
                `/random-expressions?mode=${gameMode}`
            );
            setExpressions(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching random expressions:", error);
        }
    };

    useEffect(() => {
        fetchRandomExpressions();
    }, [isGameFinished]);

    function resetGame() {
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

    function handleFinish() {
        if (numberOfExpressions === activeExpressionIndex) {
            setIsGameFinished(true);
        }
    }

    useEffect(() => {
        handleFinish();
    }, [activeExpressionIndex]);

    function handleChoice(answerChosen) {
        const isCorrect =
            answerChosen === activeExpressionWithAnswers?.right_answer;
        setIsClickable(false);
        highlightChoices(answerChosen);
        setTimeout(() => {
            if (isCorrect) score.current++;
            handleActiveExpressionIncrement();
            setIsClickable(true);
        }, 1000);
    }

    function getChoicesInShuffledOrder(activeExpressionWithAnswers) {
        const shuffledOrders = shuffle([1, 2, 3]);

        const activeExpressionChoices = [
            {
                answer: activeExpressionWithAnswers?.right_answer,
                order: shuffledOrders[0],
                correct: true,
                highlight: false,
            },
            {
                answer: activeExpressionWithAnswers?.false_answer_one,
                order: shuffledOrders[1],
                correct: false,
                highlight: false,
            },
            {
                answer: activeExpressionWithAnswers?.false_answer_two,
                order: shuffledOrders[2],
                correct: false,
                highlight: false,
            },
        ];

        // sort activeExpressionChoices by order number
        activeExpressionChoices.sort((a, b) => a.order - b.order);

        return activeExpressionChoices;
    }

    function highlightChoices(answerChosen) {
        setActiveExpressionChoices((prevChoices) =>
            prevChoices.map((choice) =>
                choice.answer === answerChosen || choice.correct
                    ? { ...choice, highlight: true }
                    : choice
            )
        );
    }

    useEffect(() => {
        const activeExpressionChoices = getChoicesInShuffledOrder(
            expressions[activeExpressionIndex]
        );
        setActiveExpressionChoices(activeExpressionChoices);
    }, [activeExpressionIndex, expressions]);

    const progress = (activeExpressionIndex / numberOfExpressions) * 100;

    function handleActiveExpressionIncrement() {
        setActiveExpressionIndex((curr) => curr + 1);
    }

    return (
        <>
            <Head title="Game" />
            <CustomGuestLayout>
                <div className="h-full relative flex justify-start items-center flex-col gap-3 font-nova overflow-x-hidden mt-3  mx-3">
                    {loading && <p>Loading...</p>}
                    {loading && (
                        <span className="loading loading-infinity loading-lg"></span>
                    )}
                    {!loading && !isGameFinished && (
                        <>
                            <ProgressBar progress={progress} />
                            <ExpressionsContainer fadeIn={fadeIn}>
                                <ActiveExpressionHeader>
                                    {activeExpression}
                                </ActiveExpressionHeader>
                                <div className="flex flex-col gap-3 w-full overflow-hidden">
                                    {activeExpressionChoices.map(
                                        (choice, id) => (
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
                                        )
                                    )}
                                </div>
                            </ExpressionsContainer>
                        </>
                    )}
                    {/* show score */}
                    {isGameFinished && (
                        <Score score={score.current} resetGame={resetGame} />
                    )}
                </div>
            </CustomGuestLayout>
        </>
    );
};

export default Game;
