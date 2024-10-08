import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar.jsx";
import NavMobile from "@/Components/NavMobile.jsx";

export default function Guest({ children }) {
    return (
        <>
            <div className="min-h-screen">
                <Navbar />
                <NavMobile />
                {children}
            </div>
            <Footer />
        </>
    );
}
