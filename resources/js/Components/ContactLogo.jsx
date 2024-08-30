const ContactLogo = ({ children, href }) => {
    return (
        <a
            href={href}
            target="_blank"
            className="opacity-30 hover:opacity-80 cursor-pointer transition-opacity duration-300 fill-midnight rounded-full border-[1px] border-midnight py-3 px-3"
        >
            {children}
        </a>
    );
};

export default ContactLogo;
