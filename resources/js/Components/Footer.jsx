import React from "react";
import ContactLogo from "./ContactLogo";
import github from "../../assets/github.svg";
import linkedin from "../../assets/linkedin.svg";
import portfolio from "../../assets/portfolio.svg";

const Footer = () => {
    const logoHeigth = "20";
    const logoWidth = logoHeigth;
    return (
        <footer className="footer footer-center p-10 border-t-[1px] border-midnight/10 md:flex md:flex-row-reverse md:justify-between ">
            <nav>
                <div className="grid grid-flow-col gap-5 md:gap:10 max">
                    <ContactLogo href={"https://github.com/Homvi"}>
                        <img src={github} alt="github" />
                    </ContactLogo>
                    <ContactLogo
                        href={"https://www.linkedin.com/in/adamhonvedo/"}
                    >
                        <img src={linkedin} alt="linkedin" />
                    </ContactLogo>
                    <ContactLogo href={"https://adakin.dev/"}>
                        <img src={portfolio} alt="portfolio" />
                    </ContactLogo>
                </div>
            </nav>
            <aside>
                <p className="opacity-40 text-midnight">
                    Copyright © {new Date().getFullYear()} - All right reserved
                    by adakin
                </p>
            </aside>
        </footer>
    );
};

export default Footer;
