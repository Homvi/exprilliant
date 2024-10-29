import { ReactNode } from 'react';

interface ActiveExpressionHeaderPropType {
  children: ReactNode;
}

const ActiveExpressionHeader = ({ children }: ActiveExpressionHeaderPropType) => {
  return <h2 className="text-2xl my-6">{children}</h2>;
};

export default ActiveExpressionHeader;
