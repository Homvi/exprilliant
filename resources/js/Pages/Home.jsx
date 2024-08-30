import mundo from "../../assets/animations/mundo.json";
import { useLottie } from "lottie-react";
import { Head, Link, usePage } from "@inertiajs/react";
import CustomGuestLayout from "@/Layouts/CustomGuestLayout";

const Home = () => {
    // lottie animation configuration
    const options = {
        animationData: mundo,
        loop: true,
    };

    // language content
    const { localeData } = usePage().props;
    const { home_page } = localeData.data;

    const { View } = useLottie(options);

    return (
        <>
            <Head title="Welcome" />
            <CustomGuestLayout>
                <div className="px-2 text-2xl min-h-screen flex flex-col md:flex-row items-center font-nova">
                    <div className="flex my-11 md:w-[40%] justify-center h-full">
                        {/* lottie animation */}
                        {View}
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="text-center w-full max-w-md">
                            {home_page.title}
                        </h2>
                        <div className="flex my-9 flex-col gap-3 w-full md:w-[70%] text-center">
                            <Link
                                href="/choose-game-mode"
                                className="bg-[#60AC90] shadow-md transition-all duration-300 hover:scale-105 text-white py-2 hover:shadow-xl w-full rounded-lg px-1"
                            >
                                {home_page.get_started}
                            </Link>
                            <Link
                                href="/login"
                                className="bg-[#052138] shadow-md text-white py-2 transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-lg px-1"
                            >
                                {home_page.login}
                            </Link>
                            <span className="text-base text-midnight/30">
                                {home_page.explanation}
                            </span>
                        </div>
                    </div>
                </div>
            </CustomGuestLayout>
        </>
    );
};

export default Home;
