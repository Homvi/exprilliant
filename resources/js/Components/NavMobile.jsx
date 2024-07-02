import { Link } from "@inertiajs/react";
import logo from "../../assets/exprilliant-with-text.webp";

const MobileNavbar = () => {
    const handleLogout = () => {
        // TODO: BE - Handle logout
        //navigate user to welcome page
    };

    // TODO: BE - Handle user dynamically
    const loggedInUser = {
        firstName: null,
    };

    const isFontSizeLarge = false;
    const language = "en";

    return (
        <div className="navbar bg-base-100 md:hidden">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                    </div>
                    <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
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
                        {loggedInUser.firstName && (
                            <li>
                                <Link to="/requestExpression">
                                    Request expression
                                </Link>
                            </li>
                        )}
                        <li>
                            {" "}
                            <details>
                                <summary>Change language</summary>
                                <ul className="flex">
                                    <div className="form-control">
                                        <label className="label cursor-pointer">
                                            <ul>
                                                <li
                                                    onClick={() => {
                                                        changeLanguage("es");
                                                    }}
                                                >
                                                    <button
                                                        disabled={
                                                            language === "es"
                                                        }
                                                        className="btn mb-2"
                                                    >
                                                        Español
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className="btn"
                                                        disabled={
                                                            language === "en"
                                                        }
                                                        onClick={() =>
                                                            changeLanguage("en")
                                                        }
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
                            {" "}
                            <details>
                                <summary>Accessibility</summary>
                                <ul className="flex justify-start ">
                                    <div className="form-control flex flex-wrap  w-full">
                                        <span className="label-text w-fit">
                                            Change font size
                                        </span>
                                        <input
                                            type="checkbox"
                                            className="toggle mt-1"
                                            onChange={() =>
                                                dispatch(changeFontSize())
                                            }
                                            checked={isFontSizeLarge}
                                        />
                                    </div>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <Link to="/" className="btn btn-ghost text-xl">
                    <img src={logo} alt="Exprilliant" className="h-8" />
                </Link>
            </div>
            <div className="navbar-end"></div>
        </div>
    );
};

export default MobileNavbar;