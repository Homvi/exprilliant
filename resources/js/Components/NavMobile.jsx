import { Link, usePage } from "@inertiajs/react";
import logo from "../../assets/exprilliant-with-text.webp";

const MobileNavbar = () => {
    const { auth, localeData } = usePage().props;
    const { data } = localeData;

    const handleLogout = async () => {
        await axios.post("/logout");
        window.location.reload();
    };

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
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {!auth.user && (
                            <li>
                                <Link href="/register">{data["register"]}</Link>
                            </li>
                        )}
                        {!auth.user && (
                            <li>
                                <Link href="/login">{data["login_nav"]}</Link>
                            </li>
                        )}
                        {auth.user && (
                            <li onClick={handleLogout}>
                                <Link href="#">{data["logout"]}</Link>
                            </li>
                        )}
                        {auth.user && (
                            <li>
                                <Link href="/request-new-expression">
                                    {data["request_new_expression"]}
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <Link href="/" className="btn btn-ghost text-xl">
                    <img src={logo} alt="Exprilliant" className="h-8" />
                </Link>
            </div>
            <div className="navbar-end"></div>
        </div>
    );
};

export default MobileNavbar;
