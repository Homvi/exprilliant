import { Expression } from '@/types/Expressions';
import React from 'react';

const Expressions = ({ expressions }: { expressions: Expression[] }) => {
  return (
    <div className="container mx-auto">
      <div className="text-2xl my-3">
        <h1>Expressions</h1>
      </div>
      {expressions.map((expression) => (
        <div className="flex flex-col border-b border-gray-200 py-3" key={expression.id}>
          <div>{expression.expression}</div>
          <div className="text-sm text-gray-500">{expression.expression_language} → {expression.answer_language}</div>
          <div className="text-xl text-gray-600">{expression.right_answer}</div>
        </div>
      ))}
    </div>
  );
};

export default Expressions;
