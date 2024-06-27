// import { Link } from "@inertiajs/react";

import Navbar from "@/Components/Navbar.jsx";
import NavMobile from "@/Components/NavMobile.jsx";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen bg-red">
            <Navbar />
            <NavMobile />
            {children}
        </div>
    );
}
