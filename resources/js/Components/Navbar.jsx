import { Link, usePage } from "@inertiajs/react";
import logo from "../../assets/exprilliant-with-text.webp";
import { useRef } from "react";

const Navbar = () => {
    const { auth } = usePage().props;

    const handleLogout = async () => {
        await axios.post("/logout");
        window.location.reload();
    };

    const languageSettingsDrawerRef = useRef(null);
    const fontSizeSettingsDrawerRef = useRef(null);

    function closeMenu() {
        if (
            languageSettingsDrawerRef.current &&
            fontSizeSettingsDrawerRef.current
        ) {
            languageSettingsDrawerRef.current.open = false;
            fontSizeSettingsDrawerRef.current.open = false;
        }
    }

    const isFontSizeLarge = false;
    const language = "en";

    return (
        <div className="navbar bg-base-100 font-nova border-b-[1px] py-4 border-[#05213819] relative top-0 z-40 hidden md:flex">
            <div className="flex-1">
                <Link
                    href="/"
                    className={`btn btn-ghost ${
                        isFontSizeLarge ? "text-3xl" : "text-xl"
                    }`}
                >
                    <img src={logo} alt="Exprilliant" className="h-12" />
                </Link>
            </div>
            <div className="flex-none">
                <ul
                    className={`menu menu-horizontal px-1 ${
                        isFontSizeLarge ? "text-xl" : ""
                    }`}
                >
                    <li>
                        <details ref={languageSettingsDrawerRef}>
                            <summary className="text-gray-400">
                                Change language
                            </summary>
                            <ul className="flex">
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <ul>
                                            <li
                                                onClick={() => {
                                                    closeMenu();
                                                }}
                                            >
                                                <button
                                                    disabled={language === "es"}
                                                    className="btn mb-2 z-50"
                                                >
                                                    Español
                                                </button>
                                            </li>
                                            <li
                                                onClick={() => {
                                                    closeMenu();
                                                }}
                                            >
                                                <button
                                                    disabled={language === "en"}
                                                    className="btn z-50"
                                                >
                                                    English
                                                </button>
                                            </li>
                                        </ul>
                                    </label>
                                </div>
                            </ul>
                        </details>
                    </li>
                    {/* <li>
                        <details ref={fontSizeSettingsDrawerRef}>
                            <summary className="text-gray-400">
                                Accessibility
                            </summary>
                            <ul className="flex">
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text ">
                                            Change font size
                                        </span>
                                        <input
                                            type="checkbox"
                                            className="toggle ml-3"
                                            onChange={() => {
                                                closeMenu();
                                            }}
                                            checked={isFontSizeLarge}
                                        />
                                    </label>
                                </div>
                            </ul>
                        </details>
                    </li> */}
                    {!auth.user && (
                        <>
                            <li>
                                <Link href="/register">Register</Link>
                            </li>
                            <li>
                                <Link href="/login">Login</Link>
                            </li>
                        </>
                    )}
                    {auth.user && (
                        <li onClick={handleLogout}>
                            <a href="#">Logout</a>
                        </li>
                    )}
                    {auth.user && (
                        <li>
                            <Link href="/request-new-expression">
                                Request new expression
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
