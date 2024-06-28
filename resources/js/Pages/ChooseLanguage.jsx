import es from "../../assets/es.svg";
import en from "../../assets/en.svg";
import { Link } from "@inertiajs/react";
import CustomGuestLayout from "../Layouts/CustomGuestLayout";

const ChooseLanguage = () => {
    const language = "en";

    const isFontSizeLarge = false;

    return (
        <CustomGuestLayout>
            <div className={isFontSizeLarge ? "text-3xl" : "text-2xl"}>
                <div className="min-h-screen font-nova bg-[#052138] text-white p-3 flex flex-col">
                    <h1 className="text-center my-6">I want to learn...</h1>
                    {/* spanish card */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        <Link
                            to="/game"
                            onClick={() => changeGameMode("SpanishToEnglish")}
                        >
                            <div className="border-2 border-[#4c4c4c33] flex w-44 p-5 text-center cursor-pointer rounded-xl flex-col hover:border-white/40 transition-all duration-100 hover:bg-white/10 items-center">
                                <img
                                    src={es}
                                    alt="Spanish flag"
                                    className="w-full"
                                />
                                <h3
                                    className={
                                        isFontSizeLarge
                                            ? "mt-3"
                                            : "mt-3 text-xl"
                                    }
                                >
                                    Spanish expressions
                                </h3>
                            </div>
                        </Link>
                        {/* English card */}
                        <Link
                            to="/game"
                            onClick={() => changeGameMode("EnglishToSpanish")}
                        >
                            <div className="border-2 border-[#4c4c4c33] hover:border-white/40 transition-all duration-100 hover:bg-white/10 flex w-44 p-5 text-center cursor-pointer rounded-xl flex-col items-center">
                                <img
                                    src={en}
                                    alt="English flag"
                                    className="w-full"
                                />
                                <h3
                                    className={
                                        isFontSizeLarge
                                            ? "mt-3"
                                            : "mt-3 text-xl"
                                    }
                                >
                                    English Expressions
                                </h3>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </CustomGuestLayout>
    );
};

export default ChooseLanguage;
