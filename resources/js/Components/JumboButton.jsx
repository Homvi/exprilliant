import { Link } from "@inertiajs/react";

const JumboButton = ({ className = "bg-custom-teal", content, ...props }) => {

    return (
        <Link
            {...props}
            className={
                "shadow-md text-white py-2 transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-lg px-1 " +
                className
            }
        >
            {content}
        </Link>
    );
};

export default JumboButton;
