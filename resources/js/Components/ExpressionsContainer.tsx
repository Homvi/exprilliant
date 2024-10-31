import { ReactNode, useEffect, useState } from 'react';

interface ExpressionsContainerPropType {
  children: ReactNode;
}

const ExpressionsContainer = ({ children }: ExpressionsContainerPropType) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      id="expressionsContainer"
      className={`flex flex-col text-center justify-center w-full md:max-w-xl items-center gap-3 transition-all duration-1000 ${
        !isVisible ? 'opacity-0 -translate-y-28' : 'opacity-100 translate-y-0'
      }`}
    >
      {children}
    </div>
  );
};

export default ExpressionsContainer;
