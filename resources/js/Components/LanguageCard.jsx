import { useGameMode } from "@/contexts/GameModeContext";
import { Link } from "@inertiajs/react";

const LanguageCard = ({
    questionFlag,
    answerFlag,
    text,
    gameMode,
    questionFlagAltText,
    answerFlagAltText,
}) => {
    // allow to set game mode with useContext
    const { setGameMode } = useGameMode();

    const handleGameModeSelection = (mode) => {
        setGameMode(mode);
    };

    return (
        <Link href="/game" onClick={() => handleGameModeSelection(gameMode)}>
            <div className="border-2 border-[#4c4c4c33] flex w-44 p-5 text-center cursor-pointer rounded-xl flex-col hover:border-white/40 transition-all duration-100 hover:bg-white/10 items-center">
                <img
                    src={questionFlag}
                    alt={questionFlagAltText}
                    className="w-full mb-2"
                />
                <div className="flex justify-center space-x-1">
                    <img
                        src={answerFlag}
                        alt={answerFlagAltText}
                        className="w-8 h-8"
                    />
                    <img
                        src={answerFlag}
                        alt={answerFlagAltText}
                        className="w-8 h-8"
                    />
                    <img
                        src={answerFlag}
                        alt={answerFlagAltText}
                        className="w-8 h-8"
                    />
                </div>

                {/* text content eg.: "Spanish expressions" */}
                <h3 className="mt-3 text-xl">{text}</h3>
            </div>
        </Link>
    );
};

export default LanguageCard;
