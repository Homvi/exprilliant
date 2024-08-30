import React, { useState, useEffect } from "react";
import { useLottie } from "lottie-react";
import check from "../../assets/animations/check.json";
import fireworks from "../../assets/animations/fireworks.json";
import { Link, usePage } from "@inertiajs/react";
import { numberOfExpressions } from "@/config";

const Score = ({ score, resetGame }) => {
    const [animatedScore, setAnimatedScore] = useState(0);

    const { localeData } = usePage().props;
    const { score_page } = localeData.data;

    const animation = score == numberOfExpressions ? fireworks : check;
    const hasToLoop = score == numberOfExpressions ? true : false;

    const options = {
        animationData: animation,
        loop: hasToLoop,
    };

    const { View } = useLottie(options);

    useEffect(() => {
        // Duration of the animation in milliseconds
        const duration = 300;
        // The increment per update to reach the final score in the given duration
        const increment = score / (duration / 100);
        let currentScore = 0;

        const interval = setInterval(() => {
            currentScore += increment;
            if (currentScore < score) {
                setAnimatedScore(currentScore);
            } else {
                // Ensure the final score is set correctly and clear the interval
                setAnimatedScore(score);
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [score]);

    return (
        <div className="flex justify- md:justify-center flex-col items-center gap-6 w-full my-5 md:min-h-[500px]">
            <div className="w-56 sm:max-w-2xl">{View}</div>
            <h2 className="text-[#052138a4] text-2xl">
                {score_page.your_score}:{" "}
                <span
                    className={
                        score == numberOfExpressions
                            ? "text-[#a39301] animate-pulse duration-75 transition-all"
                            : "text-[#FF9600]"
                    }
                >
                    {Math.round((animatedScore / numberOfExpressions) * 100)}%
                </span>
            </h2>
            {score <= 4 && (
                <h3 className="text-[#052138a4] text-xl tracking-widest">
                    {score_page.good_job}
                </h3>
            )}
            {score > 4 && (
                <h3 className="text-[#a39301] text-xl tracking-widest">
                    {score_page.excellent_job}
                </h3>
            )}
            <div className="flex gap-6 justify-center items-center flex-col md:flex-row w-full text-center ">
                <Link
                    className="bg-[#052138] w-full whitespace-nowrap shadow-md text-white py-2 transition-all duration-300 hover:scale-105 md:w-[40%] rounded-lg px-1 max-w-[200px]"
                    href="/"
                >
                    {score_page.go_to_main_page}
                </Link>
                <button
                    onClick={resetGame}
                    className="bg-[#60AC90] w-full whitespace-nowrap shadow-md text-white py-2 transition-all duration-300 hover:scale-105 md:w-[40%] rounded-lg px-1 max-w-[200px]"
                >
                    {score_page.give_me_more} ({numberOfExpressions})
                </button>
            </div>
        </div>
    );
};

export default Score;
