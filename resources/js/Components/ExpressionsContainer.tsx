import { ReactNode } from 'react';

interface ExpressionsContainerPropType {
  fadeIn: boolean;
  children: ReactNode;
}

const ExpressionsContainer = ({ fadeIn, children }: ExpressionsContainerPropType) => {
  return (
    <div
      id="expressionsContainer"
      className={`flex flex-col text-center justify-center w-full md:max-w-xl items-center gap-3 transition-all duration-300 ${
        fadeIn ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
      }`}
    >
      {children}
    </div>
  );
};

export default ExpressionsContainer;
