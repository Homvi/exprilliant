import { Link } from "@inertiajs/react";
import logo from "../../assets/exprilliant-with-text.webp";
import { useRef } from "react";

const Navbar = () => {
    // TODO: BE - Handle user dynamically
    const loggedInUser = {
        firstName: null,
    };

    const handleLogout = () => {
        // TODO: BE - Handle logout
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
        } else {
            return;
        }
    }

    const isFontSizeLarge = false;
    const language = "en";

    return (
        <div className="navbar bg-base-100 font-nova border-b-[1px] py-4 border-[#05213819] relative top-0 z-40 hidden md:flex">
            <div className="flex-1">
                <Link
                    to="/"
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
                    {loggedInUser.firstName && (
                        <li>
                            <Link to="/requestExpression">
                                Request new expression
                            </Link>
                        </li>
                    )}
                    <li>
                        <details ref={languageSettingsDrawerRef}>
                            <summary>Change language</summary>
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
                    <li>
                        <details ref={fontSizeSettingsDrawerRef}>
                            <summary>Accessibility</summary>
                            <ul className="flex">
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">
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
                    </li>
                    {!loggedInUser.firstName && (
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    )}
                    {!loggedInUser.firstName && (
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                    {loggedInUser.firstName && (
                        <li onClick={handleLogout}>
                            <a href="#">Logout</a>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
