import { ReactNode } from 'react';

interface ContactLogoProps {
  children: ReactNode;
  href: string;
}

const ContactLogo = ({ children, href }: ContactLogoProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="opacity-30 hover:opacity-80 cursor-pointer transition-opacity duration-300 fill-midnight rounded-full border-[1px] border-midnight py-3 px-3"
    >
      {children}
    </a>
  );
};

export default ContactLogo;
